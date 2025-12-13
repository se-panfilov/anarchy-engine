import type { IEngineServices } from './IEngineServices';

export type IEngine = Readonly<{
  start: () => void;
  stop: () => void;
  services: IEngineServices;
}>;
