import type { Subscription } from 'rxjs';

import type { TControlsLoop, TControlsRegistry, TControlsWrapper } from '@/Engine/Controls/Models';

export function controlsLoopEffect(loop: TControlsLoop, registry: TControlsRegistry): Subscription {
  return loop.tick$.subscribe((delta: number): void => {
    registry.forEach((controls: TControlsWrapper): void => {
      if (controls.entity.enabled) controls.entity.update(delta);
    });
  });
}
