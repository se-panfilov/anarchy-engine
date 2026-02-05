import type { TColor } from '@hellpig/anarchy-engine/Color';
import type { TActive, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TTexture } from '@hellpig/anarchy-engine/Texture';
import type { CubeTexture } from 'three';
// import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';

export type TSceneParams = Readonly<{
  background?: string | TColor | TTexture | CubeTexture;
}> &
  TWithName &
  TActive &
  // TObject3DParams &
  TWithTags;
