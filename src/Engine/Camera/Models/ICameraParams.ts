import type { CameraTag } from '@/Engine/Camera/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DParams } from '@/Engine/ThreeLib';

import type { ICameraProps } from './ICameraProps';

export type ICameraParams = ICameraProps & IObject3DParams & IWithReadonlyTags<CameraTag>;
