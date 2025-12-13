import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ICameraAccessors } from './ICameraAccessors';
import type { IPerspectiveCamera } from './IPerspectiveCamera';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> & IWithObject3d & ICameraAccessors & IWithTags<CameraTag>;
