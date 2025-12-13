import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Mixins';

import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IReactiveFactory<IInputWrapper, IInputParams & IDestroyable>;
