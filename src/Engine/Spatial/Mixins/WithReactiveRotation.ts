import { Subject } from 'rxjs';
import type { Mesh } from 'three';
import { Euler } from 'three';

import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';
import type { TWithReactiveRotation } from '@/Engine/Spatial/Models';

export function withReactiveRotation(entity: Mesh): TWithReactiveRotation {
  const rotation$: Subject<Euler> = new Subject<Euler>();
  let prevRotation: Euler = new Euler();

  function update(priority: SpatialUpdatePriority): void {
    if (prevRotation.equals(entity.rotation)) return;
    if (!entity.spatial.priority < priority) return;

    const newRotation: Euler = entity.rotation.clone();
    rotation$.next(newRotation);
    prevRotation = newRotation;
  }

  return { value$: rotation$.asObservable(), update };
}
