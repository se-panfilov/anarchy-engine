export type IGlobalContainerDecorator = Readonly<{
  width: number;
  height: number;
  ratio: number;
  startWatch: (type: string, cb: () => void) => void;
  stopWatch: (type: string, cb: () => void) => void;
}>;
