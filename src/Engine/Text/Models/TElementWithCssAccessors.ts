export type TElementWithCssAccessors = Readonly<{
  setText: (text: string) => void;
  getText: () => string;
  setClassName: (name: string) => void;
  appendClassName: (name: string) => void;
  setCssProperty: (name: string, value: string | null, priority?: string) => void;
  getCssProperty: (name: string) => string;
}>;
