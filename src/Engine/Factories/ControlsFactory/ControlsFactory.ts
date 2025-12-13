import { controlsAdapter } from '@Engine/Adapters';
import type { IControlsFactory, IControlsFactoryParams, ICreateControlsFn } from '@Engine/Factories';
import type { IControlsConfig } from '@Engine/Launcher/Models';
import type { IControlsParams } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import { ControlsWrapper } from '@Engine/Wrappers';

import { AbstractFactory } from '../AbstractFactory';

const create: ICreateControlsFn = (params: IControlsParams): IControlsWrapper => ControlsWrapper(params);

export const ControlsFactory = ({ canvas, cameraRegistry }: IControlsFactoryParams): IControlsFactory => {
  return AbstractFactory('controls', create, (config: IControlsConfig) =>
    controlsAdapter(config, cameraRegistry, canvas)
  );
};
