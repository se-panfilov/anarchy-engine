import { controlsAdapter } from '@Engine/Adapters';
import type { IControlsFactory, IControlsFactoryParams, ICreateControlsFn } from '@Engine/Factories';
import { AbstractDestroyableFactory } from '@Engine/Factories/AbstractFactory/AbstractDestroyableFactory';
import type { IControlsParams } from '@Engine/Models';
import type { IControlsConfig } from '@Engine/SceneLauncher/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import { ControlsWrapper } from '@Engine/Wrappers';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractDestroyableFactory('controls', create, (config: IControlsConfig) => controlsAdapter(config, cameraRegistry, canvas));
};
