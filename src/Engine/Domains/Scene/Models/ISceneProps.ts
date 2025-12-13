import type { IColor } from '@/Engine/Domains/Color';
import type { ICubeTexture, ITexture } from '@/Engine/Domains/Texture';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}>;
