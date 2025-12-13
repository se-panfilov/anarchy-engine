import type { TModel3dLoadOptions, TModel3dParams } from '@/Engine/Models3d';
import type { TOptional } from '@/Engine/Utils';

export type TActorModel3dParams = Omit<TModel3dParams, 'options'> &
  Readonly<{
    options?: TOptional<TModel3dLoadOptions>;
  }>;
