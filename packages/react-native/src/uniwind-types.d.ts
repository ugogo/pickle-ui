// Uniwind's types add `className` to React Native's components. Apps load
// them through the file Uniwind's Metro plugin writes; the package loads them
// here to typecheck its own sources.
/// <reference types="uniwind/types" />

declare module 'uniwind' {
  export interface UniwindConfig {
    themes: readonly ['light', 'dark'];
  }
}

export {};
