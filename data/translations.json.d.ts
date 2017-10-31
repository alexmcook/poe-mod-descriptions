import { Translation } from '../src/main';

declare module 'translations.json' {
  export interface JSON {
    [key: number]: Translation;
  }
}
