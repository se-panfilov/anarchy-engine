import type { IMaterialPackProps } from '@/Engine/Material';
import type { IWithName } from '@/Engine/Mixins';
import type { IPointsMaterialTexturePack } from '@/Engine/Texture';

export type IParticlesProps = Readonly<{
  material: IMaterialPackProps<IPointsMaterialTexturePack>;
}> &
  IWithName;
