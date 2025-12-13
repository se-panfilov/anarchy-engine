import type { ICreateFN } from '@Engine/Factories';
import type { CameraWrapper } from '@Engine/Wrappers';
import type { ICameraParams } from '@Engine/Models';

export type ICreateCameraFn = ICreateFN<ReturnType<typeof CameraWrapper>, ICameraParams>;
