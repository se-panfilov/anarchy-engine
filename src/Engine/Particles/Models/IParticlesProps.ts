import type { IMaterialProps } from '@/Engine/Material';
import type { IWithName } from '@/Engine/Mixins';
import type { IMaterialTexturePack } from '@/Engine/Texture';

export type IParticlesProps = Readonly<{
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
  castShadow: boolean;
  material: IMaterialProps<IMaterialTexturePack>;
}> &
  IWithName;
