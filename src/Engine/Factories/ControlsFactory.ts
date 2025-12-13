import { ControlsWrapper } from '@Engine/Wrappers';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { ControlsParams, Factory } from '@Engine/Models';

const create = (params: ControlsParams): ReturnType<typeof ControlsWrapper> => ControlsWrapper(params);

export const ControlsFactory = (): Factory<ReturnType<typeof ControlsWrapper>, ControlsParams> =>
  AbstractFactory(create);
