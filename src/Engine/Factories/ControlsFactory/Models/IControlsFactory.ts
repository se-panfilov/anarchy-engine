import type { IControlsConfig, IControlsParams, IDestroyableFactory } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = IDestroyableFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig>;
