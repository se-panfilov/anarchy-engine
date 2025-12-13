import { controlsAdapter } from '@Engine/Domains/Controls/Adapter';
import type { IControlsConfig, IControlsFactory, IControlsFactoryParams, IControlsParams, IControlsWrapper, ICreateControlsFn } from '@Engine/Domains/Controls/Models';
import { ControlsWrapper } from '@Engine/Domains/Controls/Wrapper';
import { AbstractDestroyableFromConfigFactory } from '@Engine/Factories';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractDestroyableFromConfigFactory('controls', create, (config: IControlsConfig) => controlsAdapter(config, cameraRegistry, canvas));
};
