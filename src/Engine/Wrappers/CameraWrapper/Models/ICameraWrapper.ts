import type { AbstractWrapper } from '@Engine/Wrappers';
import type { PerspectiveCamera } from 'three';
import type { getAccessors } from '../Accessors';

export type ICameraWrapper = ReturnType<typeof AbstractWrapper<PerspectiveCamera>> & ReturnType<typeof getAccessors>;
