import type { TAbstractLightParams } from './TAbstractLightParams';

export type TPointLightParams = TAbstractLightParams &
  Readonly<{
    distance?: number;
    decay?: number;
    castShadow?: boolean;
  }>;
