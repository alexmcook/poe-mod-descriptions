import { getDescriptions, Mod } from '../../src/main';
import * as _mods from '../../data/mods.json';
let mods: Mod[] = <Mod[]> _mods;

it('should provide a description for a single mod', () => {
  let spellDamageWandImplicit = mods[1661];
  spellDamageWandImplicit.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value: string[] = ['30% increased Spell Damage'];
  expect(getDescriptions([spellDamageWandImplicit])).toEqual(value);
});

it('should provide a description for a single mod that has multiple stats', () => {
  let localAddedPhys = mods[942];
  localAddedPhys.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value: string[] = ['Adds 17 to 30 Physical Damage'];
  expect(getDescriptions([localAddedPhys])).toEqual(value);
});

it('should provide descriptions for a single mod that has multiple stats with different descriptions', () => {
  let hybridESBlock = mods[1222];
  hybridESBlock.stats.forEach(stat => {
    stat.value = stat.valueMax;
  });

  let value: string[] = ['42% increased Energy Shield', '17% increased Stun and Block Recovery'];
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

  let value: string[] = ['30% increased Spell Damage', 'Adds 17 to 30 Physical Damage', '42% increased Energy Shield', '17% increased Stun and Block Recovery'];
  expect(getDescriptions([spellDamageWandImplicit, localAddedPhys, hybridESBlock])).toEqual(value);
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

  let value: string[] = ['133% increased Energy Shield', '17% increased Stun and Block Recovery'];
  expect(getDescriptions([localPercentES, hybridESBlock])).toEqual(value);
});
