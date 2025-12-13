import type { TModel3dPack } from './TModel3dPack';

export type TPerformLoadResult = Readonly<{
  result: TModel3dPack;
  isExisting: boolean;
}>;
