import type { ICreateInputFn, IInputFactory } from './Models';
import { AbstractFactory } from '../AbstractFactory';
import { IInputWrapper, InputWrapper } from '@Engine/Wrappers';
import type { InputParams } from '@Engine/Models';

const create: ICreateInputFn = (params: InputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFactory('input', create);
