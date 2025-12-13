import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IInputFactory, IInputParams, IInputWrapper } from '../Models';
import { InputWrapper } from '../Wrapper';

const factory: IReactiveFactory<IInputWrapper, IInputParams> = { ...ReactiveFactory(FactoryType.Input, InputWrapper) };
export const InputFactory = (): IInputFactory => ({ ...factory });
