import type { CubeTexture } from 'three';

import type { TColor } from '@/Engine/Color';
import type { TActive, TWithNameOptional } from '@/Engine/Mixins';
import type { TTexture } from '@/Engine/Texture';

export type TSceneProps = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithNameOptional &
  TActive;
