import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TAnyMaterialWrapper, TMaterialRegistry } from '@Engine/Material/Models';

export function MaterialRegistry(): TMaterialRegistry {
  return AbstractEntityRegistry<TAnyMaterialWrapper>(RegistryType.Material);
}
