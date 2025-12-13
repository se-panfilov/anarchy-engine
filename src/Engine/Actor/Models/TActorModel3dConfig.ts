import type { TModel3dConfig, TModel3dLoadOptions } from '@/Engine/Models3d';
import type { TOptional } from '@/Engine/Utils';

export type TActorModel3dConfig = Omit<TModel3dConfig, 'options' | 'scale' | 'position' | 'rotation'> &
  Readonly<{
    options?: TOptional<TModel3dLoadOptions>;
  }>;
