import type { IAbstractFromConfigWrapperFactory, IInputParams } from '@Engine/Models';
import type { IInputWrapper, MOCK_INPUT_TYPE } from '@Engine/Wrappers';

// TODO (S.Panfilov) mock input type
export type IInputFactory = IAbstractFromConfigWrapperFactory<IInputWrapper, MOCK_INPUT_TYPE, IInputParams, void>;
