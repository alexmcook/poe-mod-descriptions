import { Mod } from '../src/main';

declare module 'mods.json' {
  export interface JSON {
    [key: number]: Mod;
  }
}
