import type { IControlsFactory, ICreateControlsFn } from '@Engine/Factories';
import { AbstractFactory } from '../AbstractFactory';
import type { IControlsWrapper } from '@Engine/Wrappers';
import { ControlsWrapper } from '@Engine/Wrappers';
import type { IControlsParams } from '@Engine/Models';
import { controlsAdapter } from '@Engine/Adapters';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);
export const ControlsFactory = (): IControlsFactory => AbstractFactory('controls', create, controlsAdapter);
