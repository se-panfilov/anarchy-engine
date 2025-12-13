import { CreateEntitiesStrategy } from '@Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceParams, TSpaceRegistry } from '@Engine/Space/Models';
import { createEntities, loadResourcesFromConfig } from '@Engine/Space/Utils';
import type { TWriteable } from '@Engine/Utils';
import { isDefined } from '@Engine/Utils';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, exhaustMap, filter, takeUntil } from 'rxjs';

import { Space } from './Space';

export function SpaceFromConfig(params: TSpaceParams, config: TSpaceConfig, registry: TSpaceRegistry): TSpace {
  const builtFromConfig$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);

  const space: TSpace = Space(params, registry);
  let oldBuilt$: Observable<TSpace> = space.built$;
  // eslint-disable-next-line functional/immutable-data
  (space as TWriteable<TSpace>).built$ = builtFromConfig$.pipe(filter(isDefined));

  oldBuilt$
    .pipe(
      exhaustMap(async (): Promise<unknown> => {
        await loadResourcesFromConfig(config.resources, space.services);
        await createEntities(config.entities, space.services, space.container, CreateEntitiesStrategy.Config);
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
