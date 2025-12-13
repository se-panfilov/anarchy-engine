import type { Vector3Like } from 'three';

import type { TLightShadowParams } from './TLightShadowParams';

export type TDirectionalLightShadowParams = Omit<TLightShadowParams, 'camera'> &
  Readonly<{
    camera: {
      far: number;
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
      near?: number;
      type?: string;
      up?: Vector3Like;
      zoom?: number;
      layers?: number;
    };
  }>;
