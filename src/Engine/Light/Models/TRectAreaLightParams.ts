import type { TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TAbstractLightParams } from './TAbstractLightParams';

export type TRectAreaLightParams = TAbstractLightParams &
  Readonly<{
    width: number;
    height: number;
  }> &
  TObject3DParams &
  TWithTags;
