import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera/Models';

export type ICreateCameraFn = ICreateFN<ICameraWrapper, ICameraParams>;
