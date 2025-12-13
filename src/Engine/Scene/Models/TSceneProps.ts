import type { TColor } from '@/Engine/Color';
import type { IActive, TWithName } from '@/Engine/Mixins';
import type { TCubeTexture, TTexture } from '@/Engine/Texture';

export type TSceneProps = Readonly<{
  background?: string | TColor | TTexture | TCubeTexture;
}> &
  TWithName &
  IActive;
