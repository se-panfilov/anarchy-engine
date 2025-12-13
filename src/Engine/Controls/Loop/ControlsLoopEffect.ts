import type { Subscription } from 'rxjs';

import type { TControlsLoop, TControlsRegistry, TControlsWrapper, TOrbitControlsWrapper } from '@/Engine/Controls/Models';

export function controlsLoopEffect(loop: TControlsLoop, registry: TControlsRegistry): Subscription {
  return loop.tick$.subscribe((delta: number): void => {
    registry.forEach((controls: TControlsWrapper): void => {
      if ((controls as TOrbitControlsWrapper).entity.enableDamping) controls.entity.update(delta);
    });
  });
}
