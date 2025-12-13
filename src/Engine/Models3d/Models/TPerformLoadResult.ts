import type { TModel3dLoadResult } from './TModel3dLoadResult';

export type TPerformLoadResult = Readonly<{
  result: TModel3dLoadResult;
  isExisting: boolean;
}>;
