import { AbstractWrapper, WrapperType } from '@hellpig/anarchy-engine/Abstract';
import { envMapEntityToConfig } from '@hellpig/anarchy-engine/EnvMap/Adapters';
import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@hellpig/anarchy-engine/EnvMap/Models';
import { withActiveMixin } from '@hellpig/anarchy-engine/Mixins';
import type { Subscription } from 'rxjs';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;

  const wrapper = Object.assign(AbstractWrapper(entity, WrapperType.EnvMap, params), {
    getName: (): string => params.name,
    ...withActiveMixin(),
    serialize: (dependencies: TEnvMapConfigToParamsDependencies): TEnvMapConfig => envMapEntityToConfig(wrapper, dependencies)
  });

  wrapper._setActive(isActive, true);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    texture.dispose();
    destroySub$.unsubscribe();
  });

  return wrapper;
}
