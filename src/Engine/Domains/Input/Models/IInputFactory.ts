import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { IInputParams, IInputWrapper, MOCK_INPUT_TYPE } from '@Engine/Domains/Input';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IAbstractFromConfigWrapperFactory<IInputWrapper, MOCK_INPUT_TYPE, IInputParams, void, IAbstractFactory<IInputWrapper, IInputParams>>;
