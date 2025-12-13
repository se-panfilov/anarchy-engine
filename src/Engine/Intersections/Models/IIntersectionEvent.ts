import type { Object3D, Object3DEventMap } from 'three/src/core/Object3D';
import type { Intersection } from 'three/src/core/Raycaster';

export type IIntersectionEvent = Intersection<Object3D<Object3DEventMap>>;
