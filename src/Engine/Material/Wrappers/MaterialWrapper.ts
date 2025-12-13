import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IMaterialParams, IMaterials, IMaterialWrapper } from '@/Engine/Material/Models';
import { buildMaterial } from '@/Engine/Material/Utils';

export function MaterialWrapper(params: IMaterialParams): IMaterialWrapper {
  const entity: IMaterials = buildMaterial(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Material, params),
    entity
  };

  return result;
}
