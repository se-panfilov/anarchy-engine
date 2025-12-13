import type { TModel3dProps } from './TModel3dProps';

export type TModel3dConfig = Omit<TModel3dProps, 'scale'> &
  Readonly<{
    scale?: { x: number; y: number; z: number };
  }>;
