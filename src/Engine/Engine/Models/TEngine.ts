import type { IEngineServices } from './IEngineServices';

export type TEngine = Readonly<{
  start: () => void;
  stop: () => void;
  services: IEngineServices;
}>;
