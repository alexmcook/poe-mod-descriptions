import { getDescriptions, Mod } from '../../src/main';
import * as modsJSON from '../../data/mods.json';
let mods: Mod[] = <Mod[]>modsJSON;

it('should provide a description for a single mod', () => {
  let spellDamageWandImplicit = mods[1661];
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [{ crafted: false, text: '30% increased Spell Damage' }];
  expect(getDescriptions([spellDamageWandImplicit])).toEqual(value);
});

it('should provide a description for a single mod that has multiple stats', () => {
  let localAddedPhys = mods[942];
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [{ crafted: false, text: 'Adds 17 to 30 Physical Damage' }];
  expect(getDescriptions([localAddedPhys])).toEqual(value);
});

it('should provide descriptions for a single mod that has multiple stats with different descriptions', () => {
  let hybridESBlock = mods[1222];
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '42% increased Energy Shield' },
    { crafted: false, text: '17% increased Stun and Block Recovery' }
  ];
  expect(getDescriptions([hybridESBlock])).toEqual(value);
});

it('should provide descriptions for multiple mods', () => {
  let spellDamageWandImplicit = mods[1661];
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let localAddedPhys = mods[942];
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods[1222];
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '30% increased Spell Damage' },
    { crafted: false, text: 'Adds 17 to 30 Physical Damage' },
    { crafted: false, text: '42% increased Energy Shield' },
    { crafted: false, text: '17% increased Stun and Block Recovery' }
  ];
  expect(
    getDescriptions([spellDamageWandImplicit, localAddedPhys, hybridESBlock])
  ).toEqual(value);
});

it('should provide descriptions for multiple mods that share stats', () => {
  let localPercentES = mods[993];
  localPercentES.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods[1222];
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '133% increased Energy Shield' },
    { crafted: false, text: '17% increased Stun and Block Recovery' }
  ];
  expect(getDescriptions([localPercentES, hybridESBlock])).toEqual(value);
});

it('should provide a description for base_chance_to_freeze_%', () => {
  let chanceToFreeze = mods.find(mod => {
    return mod.id === 'ChanceToFreeze1';
  });
  chanceToFreeze.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [{ crafted: false, text: '8% chance to Freeze' }];
  expect(getDescriptions([chanceToFreeze])).toEqual(value);
});

it('should provide a description for base_chance_to_freeze_% at 100%', () => {
  let chanceToFreeze = mods.find(mod => {
    return mod.id === 'ChanceToFreeze1';
  });
  chanceToFreeze.stats.forEach(stat => {
    stat.value = 100;
  });

  let value = [{ crafted: false, text: 'Always Freeze' }];
  expect(getDescriptions([chanceToFreeze])).toEqual(value);
});

it('should skip stats with id dummy_stat_display_nothing', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'AttackerTakesDamageShieldImplicit11';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: 'Reflects 220 Physical Damage to Melee Attackers' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display horror helm mod', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'SocketedGemsDealMoreElementalDamageEssence1';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: 'Socketed Gems deal 30% more Elemental Damage' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('crafted should return true for crafted mods', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'StrDexMasterPhysicalDamageCrafted2';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: true, text: 'Adds 14 to 22 Physical Damage' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display chance to flee mods correctly', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'ChanceToFleeCorrupted';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '5% chance to Cause Monsters to Flee' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});
