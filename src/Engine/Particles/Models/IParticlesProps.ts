import type { Color } from 'three/src/math/Color';

import type { IMaterialProps } from '@/Engine/Material';
import type { IWithName } from '@/Engine/Mixins';
import type { IPointsMaterialTexturePack } from '@/Engine/Texture';

export type IParticlesProps = Readonly<{
  color?: Color;
  material: IMaterialProps<IPointsMaterialTexturePack>;
}> &
  IWithName;
