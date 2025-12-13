import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ICreateInputFn, IInputFactory, IInputParams, IInputWrapper } from '@Engine/Domains/Input';
import { InputWrapper } from '@Engine/Domains/Input';

const create: ICreateInputFn = (params: IInputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFromConfigWrapperFactory('input', create);
