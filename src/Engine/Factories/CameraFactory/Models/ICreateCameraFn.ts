import type { CreateFN } from '@Engine/Factories';
import type { CameraWrapper } from '@Engine/Wrappers';
import type { CameraParams } from '@Engine/Models';

export type ICreateCameraFn = CreateFN<ReturnType<typeof CameraWrapper>, CameraParams>;
