import { Subject } from 'rxjs';

import type { TEnvMapAsyncRegistry, TEnvMapPropsPack, TEnvMapService, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function EnvMapService(registry: TEnvMapAsyncRegistry, sceneW: TSceneWrapper): TEnvMapService {
  const withActive: TWithActiveMixinResult<TEnvMapWrapperAsync> = withActiveEntityServiceMixin<TEnvMapWrapperAsync>(registry);
  const added$: Subject<TEnvMapPropsPack> = new Subject<TEnvMapPropsPack>();

  added$.subscribe(({ url, texture }: TEnvMapPropsPack): void => registry.add(url, texture));

  // TODO CWP !!!
  // TODO 9.0.0. RESOURCES: add create/createFromConfig (async) + factories
  registry.added$.subscribe((): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });

  withActive.active$.subscribe(({ texture }: TEnvMapPropsPack): void => {
    sceneW.setBackground(texture);
    sceneW.setEnvironmentMap(texture);
  });

  const findActive = withActive.findActive;

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    // TODO DESTROY: We need a way to unload env maps, tho
    registry.destroy();
    added$.unsubscribe();
    added$.complete();
    withActive.active$.unsubscribe();
    withActive.active$.complete();
  });

  return {
    added$: added$.asObservable(),
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$.asObservable(),
    getRegistry: (): TEnvMapAsyncRegistry => registry,
    getScene: (): TSceneWrapper => sceneW,
    ...destroyable
  };
}
