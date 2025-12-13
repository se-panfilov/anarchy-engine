import type { World } from '@dimforge/rapier3d';
import type { Scene } from 'three';
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from 'three';

import type { TPhysicsDebugRenderer } from '@/Engine/Physics/Models';

export function PhysicsDebugRenderer(scene: Scene, world: World): TPhysicsDebugRenderer {
  const mesh = new LineSegments(new BufferGeometry(), new LineBasicMaterial({ color: 0xffffff, vertexColors: true }));
  // eslint-disable-next-line functional/immutable-data
  mesh.frustumCulled = false;
  scene.add(mesh);

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

  return {
    update,
    isEnabled: (): boolean => {
      return enabled;
    },
    enable(): void {
      enabled = true;
    },
    disable(): void {
      enabled = false;
    }
  };
}
