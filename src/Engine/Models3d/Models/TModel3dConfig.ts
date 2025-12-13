import type { TModel3dProps } from './TModel3dProps';

export type TModel3dConfig = Omit<TModel3dProps, 'scale' | 'position' | 'rotation'> &
  Readonly<{
    scale?: { x: number; y: number; z: number };
    position?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
  }>;
