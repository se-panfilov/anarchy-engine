import { ControlsWrapper } from '@Engine/Wrappers/ControlsWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { ControlsParams } from '@Engine/Models/ControlsParams';
import type { Factory } from '@Engine/Models/Factory';

const create = (params: ControlsParams): ReturnType<typeof ControlsWrapper> => ControlsWrapper(params);

export const ControlsFactory = (): Factory<ReturnType<typeof ControlsWrapper>, ControlsParams> =>
  AbstractFactory(create);
