import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { ICreateInputFn, IInputFactory, IInputParams, IInputWrapper } from '../Models';
import { InputWrapper } from '../Wrapper';

const create: ICreateInputFn = (params: IInputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFromConfigWrapperFactory('input', create);
