import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyMaterialWrapper, TMaterialRegistry } from '@hellpig/anarchy-engine/Material/Models';

export function MaterialRegistry(): TMaterialRegistry {
  return AbstractEntityRegistry<TAnyMaterialWrapper>(RegistryType.Material);
}
