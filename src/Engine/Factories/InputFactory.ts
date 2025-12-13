import { AbstractFactory } from './AbstractFactory';
import { InputWrapper } from '@Engine/Wrappers';
import type { Factory, InputParams } from '@Engine/Models';

const create = (params: InputParams): ReturnType<typeof InputWrapper> => InputWrapper(params);

export const InputFactory = (): Factory<ReturnType<typeof InputWrapper>, InputParams> =>
  AbstractFactory('input', create);
