import type { World } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';

import type { TLoopService } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsDebugRenderer } from '@/Engine/Physics/Models';
import type { TSceneWrapper } from '@/Engine/Scene/Models';

export function PhysicsDebugRenderer(sceneW: TSceneWrapper, world: World, loopService: TLoopService): TPhysicsDebugRenderer {
  const mesh = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff, vertexColors: true }));
  // eslint-disable-next-line functional/immutable-data
  mesh.frustumCulled = false;
  sceneW.entity.add(mesh);

  let enabled: boolean = true;

  function update(): void {
    if (enabled) {
      const { vertices, colors } = world.debugRender();
      mesh.geometry.setAttribute('position', new BufferAttribute(vertices, 3));
      mesh.geometry.setAttribute('color', new BufferAttribute(colors, 4));
      // eslint-disable-next-line functional/immutable-data
      mesh.visible = true;
    } else {
      // eslint-disable-next-line functional/immutable-data
      mesh.visible = false;
    }
  }

  const loopSubscription$: Subscription = loopService.tick$.subscribe(update);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe(() => loopSubscription$.unsubscribe());

  return {
    update,
    isEnabled: (): boolean => {
      return enabled;
    },
    start(): void {
      enabled = true;
    },
    stop(): void {
      enabled = false;
    },
    ...destroyable
  };
}
