import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';

import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) any instead of IInputConfig
// TODO (S.Panfilov) mock input type
export type IInputFactory = IFactory<IInputWrapper, IInputParams> & IFromConfig<IInputWrapper, any>;
