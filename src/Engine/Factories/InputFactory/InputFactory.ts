import type { ICreateInputFn, IInputFactory } from './Models';
import { AbstractFactory } from '../AbstractFactory';
import type { IInputWrapper } from '@Engine/Wrappers';
import { InputWrapper } from '@Engine/Wrappers';
import type { IInputParams } from '@Engine/Models';

const create: ICreateInputFn = (params: IInputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFactory('input', create);
