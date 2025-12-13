import { ControlsWrapper, IControlsWrapper } from '@Engine/Wrappers';
import { AbstractFactory, CreateFN } from './AbstractFactory';
import type { ControlsParams, Factory } from '@Engine/Models';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const create: CreateFN<ReturnType<typeof ControlsWrapper>, ControlsParams> = (
  params: ControlsParams
): ReturnType<typeof ControlsWrapper> => ControlsWrapper(params);

export const ControlsFactory = (): Factory<IControlsWrapper, OrbitControls, ControlsParams> =>
  AbstractFactory('controls', create);
