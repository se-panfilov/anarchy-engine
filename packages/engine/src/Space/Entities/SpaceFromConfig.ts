import { CreateEntitiesStrategy, SpaceEvents } from '@Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceParams, TSpaceRegistry, TSpaceSettings } from '@Engine/Space/Models';
import { createEntities, loadResourcesFromConfig } from '@Engine/Space/Utils';
import type { TWriteable } from '@Shared/Utils';
import { isDefined } from '@Shared/Utils';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, exhaustMap, filter, takeUntil } from 'rxjs';

import { Space } from './Space';

export function SpaceFromConfig(params: TSpaceParams, config: TSpaceConfig, registry: TSpaceRegistry, settings?: TSpaceSettings): TSpace {
  const builtFromConfig$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);

  const space: TSpace = Space(params, registry, settings);
  let oldBuilt$: Observable<TSpace> = space.built$;
  // eslint-disable-next-line functional/immutable-data
  (space as TWriteable<TSpace>).built$ = builtFromConfig$.pipe(filter(isDefined));

  oldBuilt$
    .pipe(
      exhaustMap(async (): Promise<unknown> => {
        space.events$.next({ name: SpaceEvents.BeforeResourcesLoaded, args: { config, services: space.services, loops: space.loops } });
        await loadResourcesFromConfig(config.resources, space.services);

        space.events$.next({ name: SpaceEvents.BeforeEntitiesCreated, args: { config, services: space.services, loops: space.loops } });
        await createEntities(config.entities, space.services, space.container, CreateEntitiesStrategy.Config);
        space.events$.next({ name: SpaceEvents.AfterEntitiesCreated, args: { config, services: space.services, loops: space.loops } });

        return;
      }),
      takeUntil(space.destroy$)
    )
    .subscribe((): void => {
      builtFromConfig$.next(space);
      oldBuilt$ = null as any;
      // space.built$ = builtFromConfig$.pipe(filter(isDefined))
    });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    oldBuilt$ = null as any;

    destroySub$.unsubscribe();

    builtFromConfig$.complete();
  });

  // return Object.assign(space, { built$: builtFromConfig$ });
  return space;
}
