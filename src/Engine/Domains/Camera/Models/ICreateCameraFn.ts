import type { ICreateFN } from '@Engine/Factories';
import type { ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera/Models';

export type ICreateCameraFn = ICreateFN<ICameraWrapper, ICameraParams>;
