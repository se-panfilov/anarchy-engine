import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IControlsConfig, IControlsParams, IControlsWrapper } from '@Engine/Domains';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IDestroyableFromConfigFactory } from '@/Engine/Models';

export type IControlsFactory = IDestroyableFromConfigFactory<IControlsWrapper, OrbitControls, IControlsParams, IControlsConfig, IAbstractFactory<IControlsWrapper, IControlsParams>>;
