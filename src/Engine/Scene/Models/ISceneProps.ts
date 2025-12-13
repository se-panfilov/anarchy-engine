import type { IColor } from '@/Engine/Color';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';
import type { IActive } from '@/Engine/Mixins';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}> &
  IActive;
