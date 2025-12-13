import type { TLightShadowParams } from './TLightShadowParams';

export type TDirectionalLightShadowParams = Omit<TLightShadowParams, 'camera'> &
  Readonly<{
    camera: { far?: number; near?: number; left?: number; right?: number; top?: number; bottom?: number };
  }>;
