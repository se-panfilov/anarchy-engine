import type { TWrapper } from '@/Abstract';
import type { CameraType } from '@/Camera/Constants';
import type { TWithActiveMixin, TWithObject3d } from '@/Mixins';
import type { TWithTransformDrive } from '@/TransformDrive';

import type { TAnyCamera } from './TAnyCamera';
import type { TCameraTransformAgents } from './TCameraTransformAgents';
import type { TCommonCameraAccessors } from './TCommonCameraAccessors';

export type TCameraWrapper<T extends TAnyCamera> = TWrapper<T> &
  TWithObject3d &
  TWithActiveMixin &
  TCommonCameraAccessors &
  TWithTransformDrive<TCameraTransformAgents> &
  Readonly<{
    getType: () => CameraType;
  }>;
