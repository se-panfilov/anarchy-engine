import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { IControlsParams } from './IControlsParams';
import type { IControlsWrapper } from './IControlsWrapper';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
