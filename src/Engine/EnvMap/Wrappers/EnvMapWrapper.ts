import type { Subscription } from 'rxjs';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { envMapToConfig } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;
  const name: string = params.name;

  const wrapper = Object.assign(AbstractWrapper(entity, WrapperType.EnvMap, { name }), {
    getName: (): string => params.name,
    ...withActiveMixin(),
    // TODO 15-0-0: Let all Services to have service-level .serialize(). Also add type TWithSerializableEntities
    // TODO 15-0-0: add serializer to the service to avoid dependencies passing
    serialize: (dependencies: TEnvMapConfigToParamsDependencies): TEnvMapConfig => envMapToConfig(wrapper, dependencies)
  });

  wrapper._setActive(isActive, true);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    texture.dispose();
    destroySub$.unsubscribe();
  });

  return wrapper;
}
