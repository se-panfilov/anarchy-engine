import type { TWithReactiveRotation } from '@Anarchy/Engine/Spatial/Models';
import { Subject } from 'rxjs';
import type { Group, Mesh, Object3D } from 'three';
import { Euler } from 'three';

export function withReactiveRotation(entity: Mesh | Group | Object3D): TWithReactiveRotation {
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
