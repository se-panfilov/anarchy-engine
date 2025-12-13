import type { ICreateFN } from '@Engine/Factories';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { IControlsParams } from '@Engine/Models';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
