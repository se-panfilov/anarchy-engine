import type { IControlsConfig } from '@Engine/Launcher/Models';
import type { IControlsParams, IFactory } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = IFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig>;
