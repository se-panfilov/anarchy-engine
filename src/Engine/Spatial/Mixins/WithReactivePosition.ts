import { Subject } from 'rxjs';
import type { Mesh } from 'three';
import { Vector3 } from 'three';

import type { TWithReactivePosition } from '@/Engine/Spatial/Models';

export function withReactivePosition(entity: Mesh): TWithReactivePosition {
  const position$: Subject<Vector3> = new Subject<Vector3>();
  let prevPosition: Vector3 = new Vector3();

  function update(): void {
    if (prevPosition.equals(entity.position)) return;

    const newPosition: Vector3 = entity.position.clone();
    position$.next(newPosition);
    prevPosition = newPosition;
  }

  return { value$: position$, update };
}
