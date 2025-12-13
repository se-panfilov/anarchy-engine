import type { TAbstractResourceConfig } from '@/Engine/Abstract';

// TODO 9.0.0. RESOURCES: not clear atm, if a model could have any "options" during loading
export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'>;
