import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';

import type { IInputConfig } from './IInputConfig';
import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IFactory<IInputWrapper, IInputParams> & IFromConfig<IInputWrapper, IInputConfig>;
