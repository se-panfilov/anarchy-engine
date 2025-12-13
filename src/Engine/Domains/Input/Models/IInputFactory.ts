import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { MOCK_INPUT_TYPE } from '../Wrapper';
import type { IInputParams } from './IInputParams';
import type { IInputWrapper } from './IInputWrapper';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IAbstractFromConfigWrapperFactory<IInputWrapper, MOCK_INPUT_TYPE, IInputParams, void, IAbstractFactory<IInputWrapper, IInputParams>>;
