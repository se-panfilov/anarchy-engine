import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TEnvMapParamsPack, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export function EnvMapWrapperAsync(pack: TEnvMapParamsPack): TEnvMapWrapperAsync {
  const entity: TWriteable<TEnvMapParamsPack> = pack;

  const result = {
    ...AbstractWrapper(entity, WrapperType.EnvMap),
    entity,
    ...withActiveMixin()
  };

  result._setActive(pack.isActive, true);

  return result;
}
