import type { TModel3dPack } from './TModel3dPack';

export type TModel3dFacadeParams = Omit<TModel3dPack, 'actions' | 'mixer'>;
