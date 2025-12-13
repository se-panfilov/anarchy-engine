import type { Subscription } from 'rxjs';

import type { TControlsLoop, TControlsRegistry, TOrbitControlsWrapper } from '@/Engine/Controls/Models';

export function controlsLoopEffect(loop: TControlsLoop, registry: TControlsRegistry): Subscription {
  return loop.tick$.subscribe((delta: number): void => {
    registry.forEach((controls: TOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });
  });
}
