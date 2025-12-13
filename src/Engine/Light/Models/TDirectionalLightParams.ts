import type { Color } from 'three';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';
import type { TDirectionalLightShadowParams } from './TDirectionalLightShadowParams';

export type TDirectionalLightParams = Omit<TAbstractLightParams, 'shadow'> &
  Readonly<{
    color: Color;
    intensity?: number;
    shadow?: TDirectionalLightShadowParams;
    castShadow?: boolean;
  }> &
  TObject3DParams &
  TWithReadonlyTags;
