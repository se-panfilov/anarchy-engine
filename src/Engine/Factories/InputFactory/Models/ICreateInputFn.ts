import type { ICreateFN } from '@Engine/Factories';
import type { InputWrapper } from '@Engine/Wrappers';
import type { IInputParams } from '@Engine/Models';

export type ICreateInputFn = ICreateFN<ReturnType<typeof InputWrapper>, IInputParams>;
