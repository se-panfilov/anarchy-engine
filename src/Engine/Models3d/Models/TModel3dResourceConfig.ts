import type { TAbstractResourceConfig } from '@/Engine/Abstract';

// TODO 9.0.0. RESOURCES: Not sure if "options" needed (used to store scale, position, etc.)
export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'>;
