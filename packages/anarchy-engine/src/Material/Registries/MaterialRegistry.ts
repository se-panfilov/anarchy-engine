import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TAnyMaterialWrapper, TMaterialRegistry } from '@Anarchy/Engine/Material/Models';

export function MaterialRegistry(): TMaterialRegistry {
  return AbstractEntityRegistry<TAnyMaterialWrapper>(RegistryType.Material);
}
