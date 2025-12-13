import type { AbstractWrapper } from '@Engine/Wrappers';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type IControlsWrapper = ReturnType<typeof AbstractWrapper<OrbitControls>>;
