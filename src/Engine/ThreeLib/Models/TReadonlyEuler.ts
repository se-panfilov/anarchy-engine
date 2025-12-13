import type { Euler } from 'three';

export type TReadonlyEuler = Readonly<Pick<Euler, 'x' | 'y' | 'z' | 'order' | 'clone' | 'equals' | 'toArray'>>;
