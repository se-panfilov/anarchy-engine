import { EquirectangularReflectionMapping } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TEnvMap, TEnvMapParams, TEnvMapWrapperAsync, TEnvMapWrapperDependencies } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export async function EnvMapWrapperAsync(params: TEnvMapParams, { envMapLoader }: TEnvMapWrapperDependencies): Promise<TEnvMapWrapperAsync> {
  const { url, isActive } = params;
  const entity: TEnvMap = await envMapLoader.loadAsync(params.url);
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<TEnvMap>).mapping = params.mapping ? params.mapping : EquirectangularReflectionMapping;

  const result = {
    ...AbstractWrapper(entity, WrapperType.EnvMap),
    entity,
    getUrl: (): string => url,
    // TODO 9.0.0. RESOURCES: test that switch of active env maps is actually working
    ...withActiveMixin()
  };

  result._setActive(isActive, true);

  return result;
}
