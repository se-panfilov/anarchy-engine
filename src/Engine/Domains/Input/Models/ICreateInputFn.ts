import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

export type ICreateInputFn = ICreateFN<IInputWrapper, IInputParams>;
