import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { IInputWrapper, IInputParams, MOCK_INPUT_TYPE } from '@Engine/Domains/Input/Models';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IAbstractFromConfigWrapperFactory<IInputWrapper, MOCK_INPUT_TYPE, IInputParams, void>;
