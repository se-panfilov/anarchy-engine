import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { CameraType } from '@Anarchy/Engine/Camera/Constants';
import type { TWithActiveMixin, TWithObject3d } from '@Anarchy/Engine/Mixins';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

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
