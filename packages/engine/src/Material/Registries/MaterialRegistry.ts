import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TAnyMaterialWrapper, TMaterialRegistry } from '@/Material/Models';

export function MaterialRegistry(): TMaterialRegistry {
  return AbstractEntityRegistry<TAnyMaterialWrapper>(RegistryType.Material);
}
