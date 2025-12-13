import type { CameraTag } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IControlsType } from './IControlsType';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  enableDamping?: boolean;
}> &
  IWithReadonlyTags<ControlsTag>;
