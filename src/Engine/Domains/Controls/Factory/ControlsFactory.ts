import { AbstractDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';

import { controlsAdapter } from '../Adapter';
import type { IControlsConfig, IControlsFactory, IControlsFactoryParams, IControlsParams, IControlsWrapper, ICreateControlsFn } from '../Models';
import { ControlsWrapper } from '../Wrapper';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractDestroyableFromConfigFactory('controls', create, (config: IControlsConfig) => controlsAdapter(config, cameraRegistry, canvas));
};
