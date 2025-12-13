export type IElement2dAccessors = Readonly<{
  setText: (text: string) => void;
  setCssProperty: (name: string, value: string | null, priority?: string) => void;
  appendCssProperty: (name: string, value: string) => void;
  getCssProperty: (name: string) => string;
}>;
