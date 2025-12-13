import { AbstractWrapper, WrapperType } from '@/Abstract';
import { materialToConfig } from '@/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialConfig, TMaterialEntityToConfigDependencies, TMaterialParams, TMaterials } from '@/Material/Models';
import { buildMaterial } from '@/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TAnyMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result: TAnyMaterialWrapper = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (dependencies: TMaterialEntityToConfigDependencies): TMaterialConfig => materialToConfig(result, dependencies)
  }) as TAnyMaterialWrapper;

  return result;
}
