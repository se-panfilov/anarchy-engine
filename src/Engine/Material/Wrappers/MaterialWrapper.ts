import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { entityToConfig } from '@/Engine/Material/Adapters';
import type { TMaterialConfig, TMaterialParams, TMaterials, TMaterialWrapper } from '@/Engine/Material/Models';
import { buildMaterial } from '@/Engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (): TMaterialConfig => entityToConfig(result)
  });

  return result;
}
