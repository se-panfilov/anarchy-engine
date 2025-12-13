import type { IFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IFactory<IInputWrapper, IInputParams> & IDestroyable;
