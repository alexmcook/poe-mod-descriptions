import { Translation } from '../src/main';

declare module 'translations.json' {
  export interface translationsJSON {
    [key: number]: Translation;
  }
}
