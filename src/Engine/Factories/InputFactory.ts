import { AbstractFactory, CreateFN } from './AbstractFactory';
import { IInputWrapper, InputWrapper, MOCK_INPUT_TYPE } from '@Engine/Wrappers';
import type { Factory, InputParams } from '@Engine/Models';

const create: CreateFN<ReturnType<typeof InputWrapper>, InputParams> = (
  params: InputParams
): ReturnType<typeof InputWrapper> => InputWrapper(params);

// TODO (S.Panfilov) mock input type
export const InputFactory = (): Factory<IInputWrapper, MOCK_INPUT_TYPE, InputParams> =>
  AbstractFactory('input', create);
