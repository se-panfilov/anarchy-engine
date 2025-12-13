import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { IInputParams, IInputWrapper } from '@Engine/Domains/Input/Models';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
