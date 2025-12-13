import type { TColor } from '@Anarchy/Engine/Color';
import type { TActive, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TTexture } from '@Anarchy/Engine/Texture';
import type { CubeTexture } from 'three';
// import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';

export type TSceneParams = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithName &
  TActive &
  // TObject3DParams &
  TWithTags;
