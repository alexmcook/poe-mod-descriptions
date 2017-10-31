declare module '*.json' {
  export interface JSON {
    [key: number]: object;
  }
}