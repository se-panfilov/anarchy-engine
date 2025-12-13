import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICreateCameraFn = ICreateFN<ICameraWrapper, ICameraParams>;
