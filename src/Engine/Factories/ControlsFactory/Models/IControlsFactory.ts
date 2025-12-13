import type { ControlsParams, Factory } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = Factory<IControlsWrapper, OrbitControls, ControlsParams, void>;
