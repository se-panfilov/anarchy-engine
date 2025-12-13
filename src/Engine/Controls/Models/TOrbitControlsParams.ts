import type { TAppCanvas } from '@/Engine/App';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsParams = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    camera: TCameraWrapper;
    canvas: TAppCanvas;
    target?: TVector3Wrapper;
    cursor?: TVector3Wrapper;
  }> &
  TWithReadonlyTags;
