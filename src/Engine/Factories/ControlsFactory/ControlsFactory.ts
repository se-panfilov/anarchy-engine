import type { IControlsFactory, ICreateControlsFn } from '@Engine/Factories';
import { AbstractFactory } from '../AbstractFactory';
import { ControlsWrapper, IControlsWrapper } from '@Engine/Wrappers';
import type { ControlsParams } from '@Engine/Models';

const create: ICreateControlsFn = (params: ControlsParams): IControlsWrapper => ControlsWrapper(params);
export const ControlsFactory = (): IControlsFactory => AbstractFactory('controls', create);
