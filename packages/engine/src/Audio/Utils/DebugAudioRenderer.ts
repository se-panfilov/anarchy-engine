import type { Observable } from 'rxjs';
import { BehaviorSubject, EMPTY, switchMap } from 'rxjs';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

import type { TAudio3dWrapper, TDebugAudioRenderer } from '@/Audio/Models';
import type { TLoop } from '@/Loop';
import type { TMilliseconds } from '@/Math';
import type { TSceneWrapper } from '@/Scene';
import { isDefined } from '@/Utils';

export function DebugAudioRenderer(source: TAudio3dWrapper, sceneW: TSceneWrapper, loop: TLoop): TDebugAudioRenderer {
  const enabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // const refDistance: number = source.entity.getRefDistance();
  const maxDistance: number = source.entity.getMaxDistance();

  // const refGeometry = new SphereGeometry(refDistance, 8, 8);
  // const refMaterial = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  // const refSphere = new Mesh(refGeometry, refMaterial);
  // sceneW.entity.add(refSphere);

  const maxGeometry = new SphereGeometry(maxDistance, 8, 8);
  const maxMaterial = new MeshBasicMaterial({ color: 0xff0000, wireframe: true, opacity: 0.5, transparent: true });
  const maxSphere = new Mesh(maxGeometry, maxMaterial);
  sceneW.entity.add(maxSphere);

  enabled$.subscribe((isEnabled: boolean): void => {
    // refSphere.visible = isEnabled;
    // eslint-disable-next-line functional/immutable-data
    maxSphere.visible = isEnabled;
  });

  enabled$.pipe(switchMap((isEnabled: boolean): Observable<TMilliseconds> => (isEnabled ? loop.tick$ : EMPTY))).subscribe((): void => {
    if (isDefined(source.entity.parent)) {
      // refSphere.position.copy(source.entity.parent.position);
      maxSphere.position.copy(source.entity.parent.position);
    } else {
      maxSphere.position.copy(source.entity.position);
    }
  });

  return {
    enabled$
  };
}
