import type { IColor, ICubeTexture, ITexture } from '@/Engine/Wrappers';

export type ISceneProps = Readonly<{
  name: string;
  background?: string | IColor | ITexture | ICubeTexture;
}>
