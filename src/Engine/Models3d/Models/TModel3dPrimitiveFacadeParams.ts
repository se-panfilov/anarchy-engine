import type { TModel3dPrimitivePack } from './TModel3dPrimitivePack';

export type TModel3dPrimitiveFacadeParams = Omit<TModel3dPrimitivePack, 'actions' | 'mixer'>;
