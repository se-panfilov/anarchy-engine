import type { IColor } from '@/Engine/Color';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
  isActive: boolean;
}>;
