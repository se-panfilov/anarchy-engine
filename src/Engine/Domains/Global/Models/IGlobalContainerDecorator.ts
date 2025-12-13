import type { IAppCanvas } from '@/Engine/Domains/App';

export type IGlobalContainerDecorator = Readonly<{
  id: string;
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getCanvasElement: (selector: string) => IAppCanvas | null;
}>;
