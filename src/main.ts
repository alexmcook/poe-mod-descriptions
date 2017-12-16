import * as _ from 'lodash';
import * as translationsJSON from '../data/translations.json';
let translations: Translation[] = translationsJSON as Translation[];

export interface Translation {
  ids: string[];
  descriptions: Description[];
}

export interface Description {
  conditions: Condition[];
  formats: string[];
  indexHandlers: string[];
  text: string;
}

export interface Condition {
  min: number;
  max: number;
}

export interface Mod {
  id: string;
  stats: Stat[];
}

export interface Stat {
  id: string;
  key: number;
  value?: number;
  valueMin: number;
  valueMax: number;
}

export interface Text {
  text: string;
  crafted: boolean;
}

export interface Range {
  min: number;
  max: number;
}

export interface RangeString {
  min: string;
  max: string;
}

export function getDescriptions(mods: Mod[], noValue?: boolean): Text[] {
  let allStats = _.reduce(
    mods,
    (result: Stat[], mod) => {
      return result.concat(mod.stats);
    },
    []
  );
  let statGroups = _.groupBy(allStats, 'key');
  let output: Text[] = [];
  _.each(statGroups, statGroup => {
    if (!_.every(statGroup, stat => {
      return stat.value !== null;
    })) {
      noValue = true;
    }
    let text = getText(statGroup, noValue);
    if (text) {
      output.push({
        text: text,
        crafted: statGroup[0].key >= 10000 ? true : false
      });
    }
  });
  return output;
}

function getText(statGroup: Stat[], noValue?: boolean): string | undefined {
  statGroup = _.filter(statGroup, stat => {
    return stat.id !== 'dummy_stat_display_nothing';
  });
  if (statGroup.length === 0) {
    return;
  }
  let value: number;
  let valueRange: Range;
  if (
    _.every(statGroup, stat => {
      return stat.id === statGroup[0].id;
    })
  ) {
    if (noValue) {
      value = mergeValues(statGroup, true);
      valueRange = mergeValueRanges(statGroup);
      return getTranslation([statGroup[0].id], [value], [valueRange]);
    } else {
      value = mergeValues(statGroup);
      return getTranslation([statGroup[0].id], [value]);
    }
  } else {
    let ids = _.reduce(
      statGroup,
      (result: string[], stat) => {
        return result.concat(stat.id);
      },
      []
    );
    if (noValue) {
      let values = _.reduce(
        statGroup,
        (result: number[], stat) => {
          return result.concat(<number>stat.valueMax);
        },
        []
      );
      let valueRanges = _.reduce(
        statGroup,
        (result: Range[], stat) => {
          return result.concat({ min: stat.valueMin, max: stat.valueMax });
        },
        []
      );
      return getTranslation(ids, values, valueRanges);
    } else {
      let values = _.reduce(
        statGroup,
        (result: number[], stat) => {
          return result.concat(<number>stat.value);
        },
        []
      );
      return getTranslation(ids, values);
    }
  }
}

function mergeValues(stats: Stat[], noValue?: boolean): number {
  return _.reduce(
    stats,
    (result, stat) => {
      if (noValue) {
        return result + stat.valueMax;
      } else {
        return result + <number>stat.value;
      }
    },
    0
  );
}

function mergeValueRanges(stats: Stat[]): Range {
  return _.reduce(
    stats,
    (result, stat) => {
      result.min += stat.valueMin;
      result.max += stat.valueMax;
      return result;
    },
    { min: 0, max: 0 }
  );
}

function getTranslation(
  ids: string[],
  values: number[],
  valueRanges?: Range[]
): string {
  if (_.isArray(ids)) {
    let match = _.find(translations, translation => {
      return _.isEmpty(_.xor(translation.ids, ids));
    });
    if (match !== undefined) {
      let description = getDescription(match, values);
      if (valueRanges) {
        return formatText(description, valueRanges);
      } else {
        return formatText(description, values);
      }
    } else {
      throw new Error('No translation found for ' + ids);
    }
  } else {
    let match = _.find(translations, translation => {
      return translation.ids[0] === ids;
    });
    if (match !== undefined) {
      let description = getDescription(match, values);
      if (valueRanges) {
        return formatText(description, valueRanges);
      } else {
        return formatText(description, values);
      }
    } else {
      throw new Error('No translation found for ' + ids);
    }
  }
}

function getDescription(
  translation: Translation,
  values: number[]
): Description {
  let match = _.find(translation.descriptions, description => {
    return checkCondition(values, description.conditions);
  });
  if (match !== undefined) {
    return match;
  } else {
    throw new Error('No description found for ' + translation.ids + ' ' + values);
  }
}

function checkCondition(values: number[], conditions: Condition[]): boolean {
  return _.every(conditions, (condition, index) => {
    let min = condition.min === null ? -Infinity : condition.min;
    let max = condition.max === null ? Infinity : condition.max;
    return values[index] >= min && values[index] <= max;
  });
}

function formatText(
  description: Description,
  values: number[] | Range[]
): string {
  if (typeof values[0] === 'number') {
    values = <number[]>values;
    let valueStrings = <string[]>_.map(values, (value, index) => {
      return applyIndexHandler(description.indexHandlers[index], value);
    });
    valueStrings = _.map(valueStrings, (value, index) => {
      return applyFormat(
        value,
        description.formats[index] === undefined
          ? description.formats[0]
          : description.formats[index]
      );
    });
    return formatUnicorn(description.text, valueStrings);
  } else {
    values = <Range[]>values;
    let valueRanges = <RangeString[]>_.map(values, (value, index) => {
      return applyIndexHandler(
        description.indexHandlers[index],
        value.min,
        value.max
      );
    });
    let valueStrings = _.map(valueRanges, (value, index) => {
      let range: string;
      if (value.min === value.max) {
        range = value.max;
      } else {
        range = '(' + value.min + '-' + value.max + ')';
      }
      return applyFormat(
        range,
        description.formats[index] === undefined
          ? description.formats[0]
          : description.formats[index]
      );
    });
    return formatUnicorn(description.text, valueStrings);
  }
}

function formatUnicorn(str: string, ...args: any[]): string {
  str = str.toString();
  if (args.length) {
    let t = typeof args[0];
    let n =
      t == 'string' || t == 'number'
        ? Array.prototype.slice.call(args)
        : args[0];
    for (let arg in n) {
      str = str.replace(new RegExp(`\\{${arg}\\}`, 'gi'), n[arg]);
    }
  }
  return str;
}

function applyIndexHandler(
  handler: string,
  value: number,
  value2?: number
): string | RangeString {
  let valueOut = value;
  switch (handler) {
    case '60%_of_value':
      valueOut = value * 0.6;
      break;
    case 'deciseconds_to_seconds':
      valueOut = value * 10;
      break;
    case 'divide_by_one_hundred':
      valueOut = value / 100;
      break;
    case 'divide_by_one_hundred_and_negate':
      valueOut = -value / 100;
      break;
    case 'divide_by_one_hundred_2dp':
      valueOut = parseFloat((value / 100).toFixed(2));
      break;
    case 'milliseconds_to_seconds':
      valueOut = value / 1000;
      break;
    case 'milliseconds_to_seconds_0dp':
      valueOut = parseFloat((value / 1000).toFixed(0));
      break;
    case 'milliseconds_to_Seconds_2dp':
      valueOut = parseFloat((value / 1000).toFixed(2));
      break;
    case 'multiplicative_damage_modifier':
      valueOut = value + 100;
      break;
    case 'multiplicative_permyriad_damage_modifier':
      valueOut = value / 100 + 100;
      break;
    case 'negate':
      valueOut = -value;
      break;
    case 'old_leech_percent':
      valueOut = value / 5;
      break;
    case 'old_leech_permyriad':
      valueOut = value / 500;
      break;
    case 'per_minute_to_per_second':
      valueOut = parseFloat((value / 60).toFixed(1));
      break;
    case 'per_minute_to_per_second_0dp':
      valueOut = parseFloat((value / 60).toFixed(0));
      break;
    case 'per_minute_to_per_second_2dp':
      valueOut = parseFloat((value / 60).toFixed(2));
      break;
    case 'per_minute_to_per_second_2dp_if_required':
      valueOut =
        value % 60 !== 0 ? parseFloat((value / 60).toFixed(2)) : value / 60;
      break;
    case 'divide_by_ten_0dp':
      valueOut = parseFloat((value / 10).toFixed(0));
      break;
    case 'divide_by_two_0dp':
      valueOut = parseFloat((value / 2).toFixed(0));
      break;
    case 'divide_by_fifteen_0dp':
      valueOut = parseFloat((value / 15).toFixed(0));
      break;
    case 'divide_by_twenty_then_double_0dp':
      valueOut = parseFloat((value / 20 * 2).toFixed(0));
      break;
    case 'canonical_line':
      break;
    default:
      break;
  }
  if (value2) {
    return {
      min: valueOut.toString(),
      max: <string>applyIndexHandler(handler, value2)
    };
  } else {
    return valueOut.toString();
  }
}

function applyFormat(value: string, format: string): string {
  let valueOut = value;
  switch (format) {
    case '#':
      break;
    case '+#':
      if (parseFloat(value) > 0) {
        valueOut = '+' + value;
      }
      break;
    case '#%':
      valueOut = value + '%';
      break;
    case '+#%':
      if (parseFloat(value) > 0) {
        valueOut = '+' + value + '%';
      } else {
        valueOut = value + '%';
      }
      break;
    default:
      break;
  }
  return valueOut;
}
