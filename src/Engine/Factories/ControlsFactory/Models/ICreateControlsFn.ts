import type { ICreateFN } from '@Engine/Factories';
import type { ControlsWrapper } from '@Engine/Wrappers';
import type { IControlsParams } from '@Engine/Models';

export type ICreateControlsFn = ICreateFN<ReturnType<typeof ControlsWrapper>, IControlsParams>;
