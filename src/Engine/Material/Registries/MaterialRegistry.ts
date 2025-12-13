import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialWrapper } from '@/Engine/Material/Models';

export function MaterialRegistry(): TMaterialRegistry {
  return AbstractEntityRegistry<TMaterialWrapper>(RegistryType.Material);
}
