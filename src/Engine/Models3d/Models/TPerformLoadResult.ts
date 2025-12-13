import type { TModel3dFacade } from './TModel3dFacade';

export type TPerformLoadResult = Readonly<{
  result: TModel3dFacade;
  isExisting: boolean;
}>;
