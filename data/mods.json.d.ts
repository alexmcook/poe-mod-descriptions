import { Mod } from '../src/main';

declare module 'mods.json' {
  const value: Mod[];
  export default value;
}
