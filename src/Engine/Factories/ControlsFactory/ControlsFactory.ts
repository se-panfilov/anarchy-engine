import { controlsAdapter } from '@Engine/Adapters';
import type { IControlsFactory, IControlsFactoryParams, ICreateControlsFn } from '@Engine/Factories';
import type { IControlsConfig, IControlsParams } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import { ControlsWrapper } from '@Engine/Wrappers';
import { AbstractDestroyableFromConfigFactory } from '@Engine/Factories';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractDestroyableFromConfigFactory('controls', create, (config: IControlsConfig) => controlsAdapter(config, cameraRegistry, canvas));
};
