import type { RigidBody, Vector, World } from '@dimforge/rapier3d';
import type { TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { BehaviorSubject } from 'rxjs';
import { Vector3 } from 'three/src/math/Vector3';

import type { TSpacesData } from '../ShowcaseTypes';
import { addAwait, getContainer, removeAwait } from '../utils';
import spaceConfig from './spacePhysics.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spacePhysicsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    space.services.physicsWorldService.getDebugRenderer(space.loops.physicsLoop).start();
  },
  onChange: (space: TSpace): void => {
    addAwait('onChange', spacePhysicsData.awaits$);

    applyExplosion(space.services.physicsWorldService.getWorld(), new Vector3(), 10, 800);

    setTimeout((): void => {
      removeAwait('onChange', spacePhysicsData.awaits$);
    }, 4000);
  }
};

function applyExplosion(world: World, explosionCenter: Vector3, explosionRadius: number, explosionStrength: number): void {
  world.forEachRigidBody((body: RigidBody): void => {
    if (body.isDynamic()) {
      const bodyPosition: Vector = body.translation();
      const direction = {
        x: bodyPosition.x - explosionCenter.x,
        y: bodyPosition.y - explosionCenter.y,
        z: bodyPosition.z - explosionCenter.z
      };

      const distance: number = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);

      if (distance < explosionRadius && distance > 0.0001) {
        const invertedDistance: number = 1 / distance;
        // eslint-disable-next-line functional/immutable-data
        direction.x *= invertedDistance;
        // eslint-disable-next-line functional/immutable-data
        direction.y *= invertedDistance;
        // eslint-disable-next-line functional/immutable-data
        direction.z *= invertedDistance;

        const strength: number = explosionStrength * (1 - distance / explosionRadius);

        const impulse = {
          x: direction.x * strength,
          y: direction.y * strength,
          z: direction.z * strength
        };

        body.applyImpulse(impulse, true);
        body.applyTorqueImpulse(impulse, true);
      }
    }
  });
}
