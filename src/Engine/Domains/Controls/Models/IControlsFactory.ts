import type { IAbstractFactory, IDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';
import type { IControlsConfig, IControlsParams, IControlsWrapper } from '@Engine/Domains/Controls';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsFactory = IDestroyableFromConfigFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig, IAbstractFactory<IControlsWrapper, IControlsParams>>;
