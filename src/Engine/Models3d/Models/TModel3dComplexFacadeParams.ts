import type { TModel3dComplexPack } from './TModel3dComplexPack';

export type TModel3dComplexFacadeParams = Omit<TModel3dComplexPack, 'actions' | 'mixer'>;
