import { Subject } from 'rxjs';
import type { Group, Mesh } from 'three';
import { Euler } from 'three';

import type { TWithReactiveRotation } from '@/Engine/Spatial/Models';

export function withReactiveRotation(entity: Mesh | Group): TWithReactiveRotation {
  const rotation$: Subject<Euler> = new Subject<Euler>();
  let prevRotation: Euler = new Euler();

  function update(): void {
    if (prevRotation.equals(entity.rotation)) return;

    const newRotation: Euler = entity.rotation.clone();
    rotation$.next(newRotation);
    prevRotation = newRotation;
  }

  return { value$: rotation$, update };
}
