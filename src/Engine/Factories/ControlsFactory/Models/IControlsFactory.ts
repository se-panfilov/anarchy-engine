import type { IControlsConfig, IControlsParams, IDestroyableFromConfigFactory } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = IDestroyableFromConfigFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig>;
