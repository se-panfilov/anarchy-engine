import type { IControlsConfig, IControlsParams, IControlsWrapper } from '@Engine/Domains/Controls/Models';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IAbstractFactory, IDestroyableFromConfigFactory } from '@/Engine/Models';

export type IControlsFactory = IDestroyableFromConfigFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig, IAbstractFactory<IControlsWrapper, IControlsParams>>;
