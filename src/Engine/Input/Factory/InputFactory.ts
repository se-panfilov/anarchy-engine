import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { IInputFactory, IInputParams, IInputWrapper } from '@/Engine/Input/Models';
import { InputWrapper } from '@/Engine/Input/Wrapper';

const factory: IReactiveFactory<IInputWrapper, IInputParams> = { ...ReactiveFactory(FactoryType.Input, InputWrapper) };
export const InputFactory = (): IInputFactory => ({ ...factory });
