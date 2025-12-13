import type { IMaterialProps } from '@/Engine/Material';
import type { IWithName } from '@/Engine/Mixins';
import type { IPointsMaterialTexturePack } from '@/Engine/Texture';

export type IParticlesProps = Readonly<{
  material: IMaterialProps<IPointsMaterialTexturePack>;
}> &
  IWithName;
