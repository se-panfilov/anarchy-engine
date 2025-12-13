import type { ICreateFN } from '@Engine/Factories';
import type { ICameraParams } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';

export type ICreateCameraFn = ICreateFN<ICameraWrapper, ICameraParams>;
