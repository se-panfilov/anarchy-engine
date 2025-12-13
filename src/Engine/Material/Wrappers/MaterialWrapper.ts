import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TMaterialParams, TMaterials, TMaterialWrapper } from '@/Engine/Material/Models';
import { buildMaterial } from '@/Engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Material, params),
    entity
  };

  return result;
}
