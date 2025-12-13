import type { IControlsFactory, ICreateControlsFn } from '@Engine/Factories';
import { AbstractFactory } from '../AbstractFactory';
import { ControlsWrapper } from '@Engine/Wrappers';
import type { ControlsParams } from '@Engine/Models';

const create: ICreateControlsFn = (params: ControlsParams): ReturnType<typeof ControlsWrapper> =>
  ControlsWrapper(params);
export const ControlsFactory = (): IControlsFactory => AbstractFactory('controls', create);
