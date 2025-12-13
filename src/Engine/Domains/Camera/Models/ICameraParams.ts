import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IObject3DPropParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ICameraProps } from './ICameraProps';

export type ICameraParams = ICameraProps & IObject3DPropParams & IWithReadonlyTags<CameraTag>;
