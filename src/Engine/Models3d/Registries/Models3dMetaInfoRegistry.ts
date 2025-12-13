import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TModel3dResourceConfig, TModels3dMetaInfoRegistry } from '@/Engine/Models3d/Models';

export const Models3dMetaInfoRegistry = (): TModels3dMetaInfoRegistry => AbstractSimpleRegistry<TModel3dResourceConfig>(RegistryType.Model3dMetaInfo);
