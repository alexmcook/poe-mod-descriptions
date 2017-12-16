import { getDescriptions, Mod } from '../../src/main';
import * as modsJSON from '../../data/mods.json';
let mods: Mod[] = modsJSON as Mod[];

it('should provide a description for a single mod', () => {
  let spellDamageWandImplicit = mods.find(mod => {
    return mod.id === 'SpellDamageOnWeaponImplicitWand11';
  });
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [{ crafted: false, text: '30% increased Spell Damage' }];
  expect(getDescriptions([spellDamageWandImplicit])).toEqual(value);
});

it('should provide a description for a single mod that has multiple stats', () => {
  let localAddedPhys = mods.find(mod => {
    return mod.id === 'LocalAddedPhysicalDamage6';
  });
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [{ crafted: false, text: 'Adds 17 to 30 Physical Damage' }];
  expect(getDescriptions([localAddedPhys])).toEqual(value);
});

it('should provide descriptions for a single mod that has multiple stats with different descriptions', () => {
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });
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
  let spellDamageWandImplicit = mods.find(mod => {
    return mod.id === 'SpellDamageOnWeaponImplicitWand11';
  });
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let localAddedPhys = mods.find(mod => {
    return mod.id === 'LocalAddedPhysicalDamage6';
  });
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });
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
  let localPercentES = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercent6';
  });
  localPercentES.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });
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

it('should display a mod with +d% format correctly', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'FireResistanceCrafted';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '+33% to Fire Resistance' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display a value for local_accuracy_rating_+%', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'AccuracyPercentImplicitSword1';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '40% increased Accuracy Rating' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display a value for BleedChanceAndDurationForJewel__', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'BleedChanceAndDurationForJewel__';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: 'Attacks have 5% chance to cause Bleeding' },
    { crafted: false, text: '16% increased Bleeding Duration' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display a value for AbyssChanceToGainOnslaughtOnKillJewel1', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'AbyssChanceToGainOnslaughtOnKillJewel1';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '5% chance to gain Onslaught for 4 seconds on Kill' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('should display a value for ColdDamagePrefixOnWeaponColdPenetrationUber1', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'ColdDamagePrefixOnWeaponColdPenetrationUber1';
  });
  dummyStat.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: 'Socketed Gems are Supported by Level 16 Cold Penetration' },
    { crafted: false, text: '52% increased Cold Damage' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});

it('[NULL VALUE] should provide a description for a single mod', () => {
  let spellDamageWandImplicit = mods.find(mod => {
    return mod.id === 'SpellDamageOnWeaponImplicitWand11';
  });

  let value = [{ crafted: false, text: '(26-30)% increased Spell Damage' }];
  expect(getDescriptions([spellDamageWandImplicit], true)).toEqual(value);
});

it('[NULL VALUE] should provide a description for a single mod that has multiple stats', () => {
  let localAddedPhys = mods.find(mod => {
    return mod.id === 'LocalAddedPhysicalDamage6';
  });

  let value = [{ crafted: false, text: 'Adds (13-17) to (26-30) Physical Damage' }];
  expect(getDescriptions([localAddedPhys], true)).toEqual(value);
});

it('[NULL VALUE] should provide descriptions for a single mod that has multiple stats with different descriptions', () => {
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });

  let value = [
    { crafted: false, text: '(39-42)% increased Energy Shield' },
    { crafted: false, text: '(16-17)% increased Stun and Block Recovery' }
  ];
  expect(getDescriptions([hybridESBlock], true)).toEqual(value);
});

it('[NULL VALUE] should provide descriptions for multiple mods', () => {
  let spellDamageWandImplicit = mods.find(mod => {
    return mod.id === 'SpellDamageOnWeaponImplicitWand11';
  });
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let localAddedPhys = mods.find(mod => {
    return mod.id === 'LocalAddedPhysicalDamage6';
  });
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '(26-30)% increased Spell Damage' },
    { crafted: false, text: 'Adds (13-17) to (26-30) Physical Damage' },
    { crafted: false, text: '(39-42)% increased Energy Shield' },
    { crafted: false, text: '(16-17)% increased Stun and Block Recovery' }
  ];
  expect(
    getDescriptions([spellDamageWandImplicit, localAddedPhys, hybridESBlock], true)
  ).toEqual(value);
});

it('[NULL VALUE] should provide descriptions for multiple mods that share stats', () => {
  let localPercentES = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercent6';
  });
  localPercentES.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });
  let hybridESBlock = mods.find(mod => {
    return mod.id === 'LocalIncreasedEnergyShieldPercentAndStunRecovery6';
  });
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value = [
    { crafted: false, text: '(119-133)% increased Energy Shield' },
    { crafted: false, text: '(16-17)% increased Stun and Block Recovery' }
  ];
  expect(getDescriptions([localPercentES, hybridESBlock], true)).toEqual(value);
});

it('[NULL VALUE] should provide a description for base_chance_to_freeze_%', () => {
  let chanceToFreeze = mods.find(mod => {
    return mod.id === 'ChanceToFreeze1';
  });

  let value = [{ crafted: false, text: '(6-8)% chance to Freeze' }];
  expect(getDescriptions([chanceToFreeze], true)).toEqual(value);
});

it('[NULL VALUE] should skip stats with id dummy_stat_display_nothing', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'AttackerTakesDamageShieldImplicit11';
  });

  let value = [
    { crafted: false, text: 'Reflects (181-220) Physical Damage to Melee Attackers' }
  ];
  expect(getDescriptions([dummyStat], true)).toEqual(value);
});

it('[NULL VALUE] should display horror helm mod', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'SocketedGemsDealMoreElementalDamageEssence1';
  });

  let value = [
    { crafted: false, text: 'Socketed Gems deal 30% more Elemental Damage' }
  ];
  expect(getDescriptions([dummyStat], true)).toEqual(value);
});

it('[NULL VALUE] crafted should return true for crafted mods', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'StrDexMasterPhysicalDamageCrafted2';
  });

  let value = [
    { crafted: true, text: 'Adds (11-14) to (18-22) Physical Damage' }
  ];
  expect(getDescriptions([dummyStat], true)).toEqual(value);
});

it('[NULL VALUE] should display chance to flee mods correctly', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'ChanceToFleeCorrupted';
  });

  let value = [
    { crafted: false, text: '5% chance to Cause Monsters to Flee' }
  ];
  expect(getDescriptions([dummyStat], true)).toEqual(value);
});

it('[NULL VALUE] should display a mod with +d% format correctly', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'FireResistanceCrafted';
  });

  let value = [
    { crafted: false, text: '(27-33)% to Fire Resistance' }
  ];
  expect(getDescriptions([dummyStat], true)).toEqual(value);
});

it('[NULL VALUE] should display a null value if no value is given', () => {
  let dummyStat = mods.find(mod => {
    return mod.id === 'ColdResistanceCrafted';
  });

  let value = [
    { crafted: false, text: '(27-33)% to Cold Resistance' }
  ];
  expect(getDescriptions([dummyStat])).toEqual(value);
});