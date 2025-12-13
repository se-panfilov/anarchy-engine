import type { Vector3 } from 'three/src/math/Vector3';

import type { TAppCanvas } from '@/Engine/App';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsParams = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    camera: TCameraWrapper;
    canvas: TAppCanvas;
    target?: Vector3;
    cursor?: Vector3;
  }> &
  TWithReadonlyTags;
