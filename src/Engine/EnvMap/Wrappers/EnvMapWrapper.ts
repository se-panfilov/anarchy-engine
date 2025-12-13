import type { Subscription } from 'rxjs';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { entityToConfig } from '@/Engine/EnvMap/Adapters';
import type { TEnvMapConfig, TEnvMapParams, TEnvMapTexture, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { withActiveMixin } from '@/Engine/Mixins';

export function EnvMapWrapper(params: TEnvMapParams): TEnvMapWrapper {
  const { texture, isActive } = params;
  const entity: TEnvMapTexture = texture;

  const wrapper = Object.assign(AbstractWrapper(entity, WrapperType.EnvMap), {
    getName: (): string => params.name,
    ...withActiveMixin(),
    serialize: (): TEnvMapConfig => entityToConfig(wrapper)
  });

  wrapper._setActive(isActive, true);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    texture.dispose();
    destroySub$.unsubscribe();
  });

  return wrapper;
}
