import type { IControlsParams, IDestroyableFactory } from '@Engine/Models';
import type { IControlsConfig } from '@Engine/SceneLauncher/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = IDestroyableFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig>;
