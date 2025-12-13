import type { IAppCanvas } from '@/Engine/Domains/App';

export type IGlobalContainerDecorator = Readonly<{
  id: string;
  width: number;
  height: number;
  ratio: number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getCanvasElement: (selector: string) => IAppCanvas | null;
}>;
