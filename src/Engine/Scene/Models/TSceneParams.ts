import type { CubeTexture } from 'three';

import type { TColor } from '@/Engine/Color';
import type { TActive, TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TTexture } from '@/Engine/Texture';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type TSceneParams = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithNameOptional &
  TActive &
  TObject3DParams &
  TWithTags;
