import type { IInputParams, IInputWrapper } from '@Engine/Domains/Input/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
