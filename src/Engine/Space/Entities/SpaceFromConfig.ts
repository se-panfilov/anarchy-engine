import type { Subscription } from 'rxjs';
import { BehaviorSubject, exhaustMap, skip } from 'rxjs';

import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceConfig, TSpaceHooks, TSpaceParams } from '@/Engine/Space/Models';
import { createEntities, loadResourcesFromConfig } from '@/Engine/Space/Utils';

import { Space } from './Space';

// TODO 13-0-0: can we use configToParams instead of params argument?
export function SpaceFromConfig(params: TSpaceParams, config: TSpaceConfig, hooks?: TSpaceHooks): TSpace {
  const builtFromConfig$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);

  const space: TSpace = Space(params);

  space.built$
    .pipe(
      exhaustMap((): Promise<void> => {
        hooks?.beforeResourcesLoaded?.(config, space.services, space.loops);
        return loadResourcesFromConfig(config.resources, space.services);
      })
    )
    .subscribe((): void => {
      console.log('XXX111 from config');
      hooks?.beforeEntitiesCreated?.(config, space.services, space.loops);
      createEntities(config.entities, space.services, CreateEntitiesStrategy.Config);
      hooks?.afterEntitiesCreated?.(config, space.services, space.loops);

      builtFromConfig$.next(space);
      // space.built$.complete();
      // space.built$.unsubscribe();
      space.built$ = builtFromConfig$.asObservable(); //pipe(skip(1));
    });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    builtFromConfig$.complete();
    builtFromConfig$.unsubscribe();
  });

  // return Object.assign(space, { built$: builtFromConfig$ });
  return space;
}
