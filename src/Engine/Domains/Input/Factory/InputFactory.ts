import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin } from '@Engine/Domains/Abstract';

import type { IInputFactory, IInputParams, IInputWrapper } from '../Models';
import { InputWrapper } from '../Wrapper';

const create = (params: IInputParams): IInputWrapper => InputWrapper(params);
const factory: IFactory<IInputWrapper, IInputParams> = { ...AbstractFactory('input'), create };
export const InputFactory = (): IInputFactory => ({ ...factory, ...destroyableFactoryMixin(factory) });
