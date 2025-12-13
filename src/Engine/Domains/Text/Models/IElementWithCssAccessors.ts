export type IElementWithCssAccessors = Readonly<{
  setText: (text: string) => void;
  setClassName: (name: string) => void;
  appendClassName: (name: string) => void;
  setCssProperty: (name: string, value: string | null, priority?: string) => void;
  getCssProperty: (name: string) => string;
}>;
