import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, withConfigMixin } from '@Engine/Domains/Abstract';

// import { fromConfig } from '../Adapter';
import type { IInputFactory, IInputParams, IInputWrapper } from '../Models';
import { InputWrapper } from '../Wrapper';

const create = (params: IInputParams): IInputWrapper => InputWrapper(params);
const factory: IFactory<IInputWrapper, IInputParams> = { ...AbstractFactory('input'), create };
export const InputFactory = (): IInputFactory => ({ ...factory, ...withConfigMixin(fromConfig) });
