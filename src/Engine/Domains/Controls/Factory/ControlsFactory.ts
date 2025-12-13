import { AbstractDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';
import { controlsAdapter } from '@Engine/Domains/Controls';
import type { IControlsConfig, IControlsFactory, IControlsFactoryParams, IControlsParams, IControlsWrapper, ICreateControlsFn } from '@Engine/Domains/Controls';
import { ControlsWrapper } from '@Engine/Domains/Controls';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractDestroyableFromConfigFactory('controls', create, (config: IControlsConfig) => controlsAdapter(config, cameraRegistry, canvas));
};
