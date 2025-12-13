import type { ICreateFN } from '@Engine/Factories';
import type { IInputWrapper } from '@Engine/Wrappers';
import type { IInputParams } from '@Engine/Models';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
