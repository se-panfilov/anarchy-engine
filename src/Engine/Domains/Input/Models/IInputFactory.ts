import type { IFactory } from '@Engine/Domains/Abstract';

import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) any instead of
// TODO (S.Panfilov) mock input type
export type IInputFactory = IFactory<IInputWrapper, IInputParams>;
