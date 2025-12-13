import type { TAbstractLightParams } from './TAbstractLightParams';
import type { TDirectionalLightShadowParams } from './TDirectionalLightShadowParams';

export type TDirectionalLightParams = Omit<TAbstractLightParams, 'shadow'> &
  Readonly<{
    shadow?: TDirectionalLightShadowParams;
    castShadow?: boolean;
  }>;
