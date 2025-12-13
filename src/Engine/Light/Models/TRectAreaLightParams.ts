import type { TAbstractLightParams } from './TAbstractLightParams';

export type TRectAreaLightParams = TAbstractLightParams &
  Readonly<{
    width: number;
    height: number;
  }>;
