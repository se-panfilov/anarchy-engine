export interface IGlobalContainerDecorator {
  readonly width: number;
  readonly height: number;
  readonly ratio: number;
  readonly startWatch: (type: string, cb: () => void) => void;
  readonly stopWatch: (type: string, cb: () => void) => void;
}
