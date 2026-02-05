import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { CameraType } from '@hellpig/anarchy-engine/Camera/Constants';
import type { TWithActiveMixin, TWithObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { TWithTransformDrive } from '@hellpig/anarchy-engine/TransformDrive';

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
