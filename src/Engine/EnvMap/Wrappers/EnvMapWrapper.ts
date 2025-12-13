import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;

  const result = {
    ...AbstractWrapper(entity, WrapperType.EnvMap),
    // entity,
    getName: (): string => params.name,
    // TODO 9.0.0. RESOURCES: test that switch of active env maps is actually working
    ...withActiveMixin()
  };

  result._setActive(isActive, true);

  return result;
}
