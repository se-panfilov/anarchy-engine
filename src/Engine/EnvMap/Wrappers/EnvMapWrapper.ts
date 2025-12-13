import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;

  const result = Object.assign(AbstractWrapper(entity, WrapperType.EnvMap), {
    getName: (): string => params.name,
    ...withActiveMixin()
  });

  result._setActive(isActive, true);

  return result;
}
