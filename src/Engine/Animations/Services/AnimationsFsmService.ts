import type { Subscription } from 'rxjs';

import type { TAnimationsFsmConfig, TAnimationsFsmFactory, TAnimationsFsmParams, TAnimationsFsmRegistry, TAnimationsFsmService, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

export function AnimationsFsmService(factory: TAnimationsFsmFactory, registry: TAnimationsFsmRegistry): TAnimationsFsmService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((animationsFsm: TAnimationsFsmWrapper): void => registry.add(animationsFsm));

  const create = (params: TAnimationsFsmParams): TAnimationsFsmWrapper => factory.create(params);
  const createFromConfig = (animationsFsm: ReadonlyArray<TAnimationsFsmConfig>): ReadonlyArray<TAnimationsFsmWrapper> =>
    animationsFsm.map((AnimationsFsm: TAnimationsFsmConfig): TAnimationsFsmWrapper => create(factory.configToParams(AnimationsFsm)));

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TAnimationsFsmFactory => factory,
    getRegistry: (): TAnimationsFsmRegistry => registry,
    ...destroyable
  };
}
