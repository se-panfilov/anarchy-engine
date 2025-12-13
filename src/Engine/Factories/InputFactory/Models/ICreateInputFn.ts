import type { CreateFN } from '@Engine/Factories';
import type { InputWrapper } from '@Engine/Wrappers';
import type { InputParams } from '@Engine/Models';

export type ICreateInputFn = CreateFN<ReturnType<typeof InputWrapper>, InputParams>;
