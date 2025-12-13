import type { CreateFN } from '@Engine/Factories';
import type { ControlsWrapper } from '@Engine/Wrappers';
import type { IControlsParams } from '@Engine/Models';

export type ICreateControlsFn = CreateFN<ReturnType<typeof ControlsWrapper>, IControlsParams>;
