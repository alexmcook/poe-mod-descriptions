"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var translationsJSON = require("../data/translations.json");
var translations = translationsJSON;
function getDescriptions(mods) {
    var allStats = _.reduce(mods, function (result, mod) {
        return result.concat(mod.stats);
    }, []);
    var statGroups = _.groupBy(allStats, 'key');
    var output = [];
    _.each(statGroups, function (statGroup) {
        var text = getText(statGroup);
        if (text) {
            output.push({ text: text, crafted: statGroup[0].key > 10000 ? true : false });
        }
    });
    return output;
}
exports.getDescriptions = getDescriptions;
function getText(statGroup) {
    statGroup = _.filter(statGroup, function (stat) {
        return stat.id !== 'dummy_stat_display_nothing';
    });
    if (statGroup.length === 0) {
        return;
    }
    var value;
    if (_.every(statGroup, function (stat) {
        return stat.id === statGroup[0].id;
    })) {
        value = mergeValues(statGroup);
        return getTranslation([statGroup[0].id], [value]);
    }
    else {
        var ids = _.reduce(statGroup, function (result, stat) {
            return result.concat(stat.id);
        }, []);
        var values = _.reduce(statGroup, function (result, stat) {
            return result.concat(stat.value);
        }, []);
        return getTranslation(ids, values);
    }
}
function mergeValues(stats) {
    return _.reduce(stats, function (result, stat) {
        return result + stat.value;
    }, 0);
}
function getTranslation(ids, values) {
    if (_.isArray(ids)) {
        var match = _.find(translations, function (translation) {
            return _.isEmpty(_.xor(translation.ids, ids));
        });
        if (match !== undefined) {
            var description = getDescription(match, values);
            return formatText(description, values);
        }
        else {
            throw new Error('No translation found for ' + ids);
        }
    }
    else {
        var match = _.find(translations, function (translation) {
            return translation.ids[0] === ids;
        });
        if (match !== undefined) {
            var description = getDescription(match, values);
            return formatText(description, values);
        }
        else {
            throw new Error('No translation found for ' + ids);
        }
    }
}
function getDescription(translation, values) {
    var match = _.find(translation.descriptions, function (description) {
        return checkCondition(values, description.conditions);
    });
    if (match !== undefined) {
        return match;
    }
    else {
        throw new Error('No description found for ' + translation + ' ' + values);
    }
}
function checkCondition(values, conditions) {
    return _.every(conditions, function (condition, index) {
        var min = condition.min === null ? -Infinity : condition.min;
        var max = condition.max === null ? Infinity : condition.max;
        return values[index] >= min && values[index] <= max;
    });
}
function formatText(description, values) {
    var valueStrings = _.map(values, function (value, index) {
        return applyIndexHandler(value, description.indexHandlers[index]);
    });
    valueStrings = _.map(valueStrings, function (value, index) {
        return applyFormat(value, description.formats[index] === undefined
            ? description.formats[0]
            : description.formats[index]);
    });
    return formatUnicorn(description.text, valueStrings);
}
function formatUnicorn(str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    str = str.toString();
    if (args.length) {
        var t = typeof args[0];
        var n = t == 'string' || t == 'number'
            ? Array.prototype.slice.call(args)
            : args[0];
        for (var arg in n) {
            str = str.replace(new RegExp("\\{" + arg + "\\}", 'gi'), n[arg]);
        }
    }
    return str;
}
function applyIndexHandler(value, handler) {
    var valueOut = value;
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
    return valueOut.toString();
}
function applyFormat(value, format) {
    var valueOut = value;
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
            }
            else {
                valueOut = value + '%';
            }
            break;
        default:
            break;
    }
    return valueOut;
}
