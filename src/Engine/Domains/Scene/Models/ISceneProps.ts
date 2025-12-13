import type { ICubeTexture, ITexture } from '@/Engine/Domains/Texture';
import type { IColor } from '@/Engine/Wrappers';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}>;
