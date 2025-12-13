export type IElement2dAccessors = Readonly<{
  setText: (text: string) => void;
  setCssProperty: (name: string, value: string) => void;
  appendCssProperty: (name: string, value: string) => void;
  getCssProperty: (name: string) => string;
}>;
