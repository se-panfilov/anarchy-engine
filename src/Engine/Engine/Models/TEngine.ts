import type { TEngineServices } from './TEngineServices';

export type TEngine = Readonly<{
  start: () => void;
  stop: () => void;
  services: TEngineServices;
}>;
