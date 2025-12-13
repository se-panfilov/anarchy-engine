import type { IMaterialPackProps, IPointsMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

export type IParticlesProps = Readonly<{
  material: IMaterialPackProps<IPointsMaterialTexturePack>;
}> &
  IWithName;
