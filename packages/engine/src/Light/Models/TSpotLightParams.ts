import type { TAbstractLightParams } from './TAbstractLightParams';

export type TSpotLightParams = TAbstractLightParams &
  Readonly<{
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
    castShadow?: boolean;
  }>;
