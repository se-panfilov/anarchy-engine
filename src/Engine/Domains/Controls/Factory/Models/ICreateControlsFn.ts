import type { ICreateFN } from '@Engine/Factories';
import type { IControlsParams } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';

export type ICreateControlsFn = ICreateFN<IControlsWrapper, IControlsParams>;
