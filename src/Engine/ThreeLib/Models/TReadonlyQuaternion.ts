import type { Quaternion } from 'three';

export type TReadonlyQuaternion = Readonly<Pick<Quaternion, 'x' | 'y' | 'z' | 'w' | 'clone' | 'equals' | 'dot' | 'toArray'>>;
