export type IGlobalContainerDecorator = Readonly<{
  width: number;
  height: number;
  ratio: number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
}>;
