import type { IInputParams } from '@Engine/Models';
import type { IInputWrapper } from '@Engine/Wrappers';
import { InputWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigWrapperFactory } from '../AbstractFactory';
import type { ICreateInputFn, IInputFactory } from './Models';

const create: ICreateInputFn = (params: IInputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFromConfigWrapperFactory('input', create);
