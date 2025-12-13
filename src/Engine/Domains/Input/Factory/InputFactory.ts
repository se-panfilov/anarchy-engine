import { InputWrapper } from '@Engine/Domains/Input';
import type { ICreateInputFn, IInputFactory, IInputParams, IInputWrapper } from '@Engine/Domains/Input/Models';

import { AbstractFromConfigWrapperFactory } from '@/Engine/Factories';

const create: ICreateInputFn = (params: IInputParams): IInputWrapper => InputWrapper(params);
export const InputFactory = (): IInputFactory => AbstractFromConfigWrapperFactory('input', create);
