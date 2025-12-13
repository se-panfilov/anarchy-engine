import type { CreateFN } from '@Engine/Factories';
import type { ControlsWrapper } from '@Engine/Wrappers';
import type { ControlsParams } from '@Engine/Models';

export type ICreateControlsFn = CreateFN<ReturnType<typeof ControlsWrapper>, ControlsParams>;
