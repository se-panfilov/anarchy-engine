import type { ITexture } from '@/Engine/Domains/Texture';
import type { IColor, ICubeTexture } from '@/Engine/Wrappers';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}>;
