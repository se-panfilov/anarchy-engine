import type { CubeTexture } from 'three';

import type { TColor } from '@/Color';
import type { TActive, TWithName, TWithTags } from '@/Mixins';
import type { TTexture } from '@/Texture';
// import type { TObject3DParams } from '@/ThreeLib';

export type TSceneParams = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithName &
  TActive &
  // TObject3DParams &
  TWithTags;
