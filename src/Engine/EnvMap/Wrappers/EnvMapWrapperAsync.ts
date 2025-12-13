import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TEnvMap, TEnvMapParamsPack, TEnvMapWrapperAsync, TEnvMapWrapperDependencies } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';
// import type { AnyMapping } from 'three';
// import { EquirectangularReflectionMapping } from 'three';

// TODO 9.0.0. RESOURCES: get rid of "Pack" types (e.g. TEnvMapParamsPack)
// TODO 9.0.0. RESOURCES: add param: "mapping: AnyMapping = EquirectangularReflectionMapping"
export async function EnvMapWrapperAsync(pack: TEnvMapParamsPack, { envMapLoader }: TEnvMapWrapperDependencies): Promise<TEnvMapWrapperAsync> {
  const { url, isActive } = pack;
  const entity: TEnvMap = await envMapLoader.loadAsync(pack);
  // TODO 9.0.0. RESOURCES: add param: enable mapping
  // entity.mapping = mapping;

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
