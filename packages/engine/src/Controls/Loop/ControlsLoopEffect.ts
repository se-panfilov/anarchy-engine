import type { Subscription } from 'rxjs';

import type { TAnyControlsWrapper, TControlsLoop, TControlsRegistry } from '@/Controls/Models';

export function controlsLoopEffect(loop: TControlsLoop, registry: TControlsRegistry): Subscription {
  return loop.tick$.subscribe((delta: number): void => {
    registry.forEach((controls: TAnyControlsWrapper): void => {
      if (controls.entity.enabled) controls.entity.update(delta);
    });
  });
}
