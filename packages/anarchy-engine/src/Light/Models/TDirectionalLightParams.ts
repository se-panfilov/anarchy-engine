import type { TAbstractLightParams } from './TAbstractLightParams';

export type TDirectionalLightParams = TAbstractLightParams &
  Readonly<{
    castShadow?: boolean;
  }>;
