import type { Subscription } from 'rxjs';
import { BehaviorSubject, exhaustMap } from 'rxjs';

import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceHooks, TSpaceParams } from '@/Engine/Space/Models';
import { createEntities, loadResourcesFromConfig } from '@/Engine/Space/Utils';

import { Space } from './Space';

export function SpaceFromConfig(params: TSpaceParams, config: TSpaceConfig, hooks?: TSpaceHooks): TSpace {
  const builtFromConfig$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const space: TSpace = Space(params);

  space.built$
    .pipe(
      exhaustMap((): Promise<void> => {
        hooks?.beforeResourcesLoaded?.(config, space.services, space.loops);
        return loadResourcesFromConfig(config.resources, space.services);
      })
    )
    .subscribe((): void => {
      hooks?.beforeEntitiesCreated?.(config, space.services, space.loops);
      createEntities(config.entities, space.services, CreateEntitiesStrategy.Config);
      hooks?.afterEntitiesCreated?.(config, space.services, space.loops);

      builtFromConfig$.next(true);
      builtFromConfig$.complete();
      builtFromConfig$.unsubscribe();
    });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    builtFromConfig$.complete();
    builtFromConfig$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(space, { built$: builtFromConfig$ });
}
