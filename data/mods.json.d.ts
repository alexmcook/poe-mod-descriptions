import { Mod } from '../src/main';

declare module 'mods.json' {
  export interface modsJSON {
    [key: number]: Mod;
  }
}
