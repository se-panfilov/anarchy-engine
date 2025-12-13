import type { IControlsParams, IControlsWrapper } from '@Engine/Domains/Controls/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
