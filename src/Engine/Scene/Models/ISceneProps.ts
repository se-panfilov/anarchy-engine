import type { TColor } from '@/Engine/Color';
import type { IActive, IWithName } from '@/Engine/Mixins';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';

export type ISceneProps = Readonly<{
  background?: string | TColor | ITexture | ICubeTexture;
}> &
  IWithName &
  IActive;
