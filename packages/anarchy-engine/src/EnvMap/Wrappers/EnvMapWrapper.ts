import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import { envMapToConfig } from '@Anarchy/Engine/EnvMap/Adapters';
import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@Anarchy/Engine/EnvMap/Models';
import { withActiveMixin } from '@Anarchy/Engine/Mixins';
import type { Subscription } from 'rxjs';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;

  const wrapper = Object.assign(AbstractWrapper(entity, WrapperType.EnvMap, params), {
    getName: (): string => params.name,
    ...withActiveMixin(),
    serialize: (dependencies: TEnvMapConfigToParamsDependencies): TEnvMapConfig => envMapToConfig(wrapper, dependencies)
  });

  wrapper._setActive(isActive, true);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    texture.dispose();
    destroySub$.unsubscribe();
  });

  return wrapper;
}
