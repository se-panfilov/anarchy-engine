import type { ICreateFN } from '@Engine/Factories';
import type { IInputParams, IInputWrapper } from '@Engine/Domains/Input/Models';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
