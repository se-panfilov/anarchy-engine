import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, exhaustMap, filter } from 'rxjs';

import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceHooks, TSpaceParams } from '@/Engine/Space/Models';
import { createEntities, loadResourcesFromConfig } from '@/Engine/Space/Utils';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

import { Space } from './Space';

export function SpaceFromConfig(params: TSpaceParams, config: TSpaceConfig, hooks?: TSpaceHooks): TSpace {
  const builtFromConfig$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);

  const space: TSpace = Space(params);
  let oldBuilt$: Observable<TSpace> = space.built$;
  // eslint-disable-next-line functional/immutable-data
  (space as TWriteable<TSpace>).built$ = builtFromConfig$.pipe(filter(isDefined));

  const oldBuiltSub$: Subscription = oldBuilt$
    .pipe(
      exhaustMap((): Promise<unknown> => {
        hooks?.beforeResourcesLoaded?.(config, space.services, space.loops);
        return loadResourcesFromConfig(config.resources, space.services);
      })
    )
    .subscribe((): void => {
      hooks?.beforeEntitiesCreated?.(config, space.services, space.loops);
      createEntities(config.entities, space.services, space.getContainer(), CreateEntitiesStrategy.Config);
      hooks?.afterEntitiesCreated?.(config, space.services, space.loops);

      builtFromConfig$.next(space);
      oldBuilt$ = null as any;
      // space.built$ = builtFromConfig$.pipe(filter(isDefined))
    });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    oldBuilt$ = null as any;

    destroySub$.unsubscribe();
    oldBuiltSub$.unsubscribe();

    builtFromConfig$.complete();
    builtFromConfig$.unsubscribe();
  });

  // return Object.assign(space, { built$: builtFromConfig$ });
  return space;
}
