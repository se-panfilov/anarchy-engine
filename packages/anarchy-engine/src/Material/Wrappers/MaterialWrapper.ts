import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import { materialToConfig } from '@Anarchy/Engine/Material/Adapters';
import type { TAnyMaterialWrapper, TMaterialConfig, TMaterialEntityToConfigDependencies, TMaterialParams, TMaterials } from '@Anarchy/Engine/Material/Models';
import { buildMaterial } from '@Anarchy/Engine/Material/Utils';

export function MaterialWrapper(params: TMaterialParams): TAnyMaterialWrapper {
  const entity: TMaterials = buildMaterial(params);

  const result: TAnyMaterialWrapper = Object.assign(AbstractWrapper(entity, WrapperType.Material, params), {
    entity,
    serialize: (dependencies: TMaterialEntityToConfigDependencies): TMaterialConfig => materialToConfig(result, dependencies)
  }) as TAnyMaterialWrapper;

  return result;
}
