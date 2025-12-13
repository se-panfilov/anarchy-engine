import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { IControlsParams, IControlsWrapper } from '@Engine/Domains/Controls';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
