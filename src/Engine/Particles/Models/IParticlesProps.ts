import type { Color } from 'three/src/math/Color';

import type { IMaterialProps } from '@/Engine/Material';
import type { IWithName } from '@/Engine/Mixins';
import type { IMaterialTexturePack } from '@/Engine/Texture';

export type IParticlesProps = Readonly<{
  color?: Color;
  material: IMaterialProps<IMaterialTexturePack>;
}> &
  IWithName;
