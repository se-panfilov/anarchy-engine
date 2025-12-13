import type { TColor } from '@/Engine/Color';
import type { IActive, IWithName } from '@/Engine/Mixins';
import type { ICubeTexture, TTexture } from '@/Engine/Texture';

export type ISceneProps = Readonly<{
  background?: string | TColor | TTexture | ICubeTexture;
}> &
  IWithName &
  IActive;
