import type { TColor } from '@Engine/Color';
import type { TActive, TWithName, TWithTags } from '@Engine/Mixins';
import type { TTexture } from '@Engine/Texture';
import type { CubeTexture } from 'three';
// import type { TObject3DParams } from '@Engine/ThreeLib';

export type TSceneParams = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithName &
  TActive &
  // TObject3DParams &
  TWithTags;
