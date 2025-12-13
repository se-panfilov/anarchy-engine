import type { ICreateFN } from '@Engine/Factories';
import type { IControlsParams, IControlsWrapper } from '@Engine/Domains/Controls/Models';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
