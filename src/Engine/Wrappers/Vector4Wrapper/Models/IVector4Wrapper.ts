import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IWithCoordsXYZW } from '@/Engine/Mixins';
import type { IVectorWithX, IVectorWithY } from '@/Engine/Wrappers/Vector2Wrapper';
import type { IVectorWithZ } from '@/Engine/Wrappers/Vector3Wrapper/Models';

import type { IVector4 } from './IVector4';
import type { IVectorWithW } from './IVectorWithW';

export type IVector4Wrapper = IWrapper<IVector4> &
  Readonly<{
    getCoords: () => IWithCoordsXYZW;
  }> &
  IVectorWithX &
  IVectorWithY &
  IVectorWithZ &
  IVectorWithW;
