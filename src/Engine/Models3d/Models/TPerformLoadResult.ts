import type { TModel3dComplexFacade } from './TModel3dComplexFacade';

export type TPerformLoadResult = Readonly<{
  result: TModel3dComplexFacade;
  isExisting: boolean;
}>;
