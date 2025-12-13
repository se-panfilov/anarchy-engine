import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TMaterialRegistry, TMaterialWrapper } from '@/Engine/Material/Models';

export const MaterialRegistry = (): TMaterialRegistry => AbstractEntityRegistry<TMaterialWrapper>(RegistryType.Material);
