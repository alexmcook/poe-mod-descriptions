import { Translation } from '../src/main';

declare module 'translations.json' {
  const value: Translation[];
  export default value;
}
