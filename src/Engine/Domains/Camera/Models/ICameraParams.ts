import type { CameraTag } from '@/Engine/Domains/Camera/Constants';
import type { IObject3DParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ICameraProps } from './ICameraProps';

export type ICameraParams = ICameraProps & IObject3DParams & IWithReadonlyTags<CameraTag>;
