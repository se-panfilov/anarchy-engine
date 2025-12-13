import type { Factory, InputParams } from '@Engine/Models';
import type { IInputWrapper, MOCK_INPUT_TYPE } from '@Engine/Wrappers';

// TODO (S.Panfilov) mock input type
export type IInputFactory = Factory<IInputWrapper, MOCK_INPUT_TYPE, InputParams>;
