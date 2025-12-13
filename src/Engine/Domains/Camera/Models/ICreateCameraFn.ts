import type { ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateCameraFn = ICreateFN<ICameraWrapper, ICameraParams>;
