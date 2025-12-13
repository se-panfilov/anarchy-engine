import type { CameraTag } from '@Engine/Domains/Camera';

import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';

import type { IControlsType } from './IControlsType';

export type IControlsConfig = Readonly<{
  type: IControlsType;
  cameraTag: CameraTag;
  enableDamping?: boolean;
  tags: ReadonlyArray<ControlsTag | CommonTags | string>;
}>;
