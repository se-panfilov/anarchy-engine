import type { ICreateFN } from '@Engine/Factories';
import type { IInputParams } from '@Engine/Models';
import type { IInputWrapper } from '@Engine/Wrappers';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
