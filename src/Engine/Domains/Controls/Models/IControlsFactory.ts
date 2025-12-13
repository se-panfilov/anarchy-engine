import type { IAbstractFactory, IDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsFactory = IDestroyableFromConfigFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig, IAbstractFactory<IControlsWrapper, IControlsParams>>;
