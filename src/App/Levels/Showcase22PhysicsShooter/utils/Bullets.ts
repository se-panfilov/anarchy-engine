import { MathUtils, Vector3 } from 'three';

import type { TActorParams, TActorService, TActorWrapperAsync, TWithCoordsXYZ } from '@/Engine';
import { ActorType, collisionsService, isDefined, MaterialType, mpsSpeed, Vector3Wrapper } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

export type TBullet = TActorWrapperAsync &
  Readonly<{
    setDistanceTraveled: (dist: number) => void;
    getDistanceTraveled: () => number;
    setFallSpeed: (speed: number) => void;
    getFallSpeed: () => number;
    setActive: (act: boolean) => void;
    isActive: () => boolean;
    reset: () => void;
    update: (delta: number) => void;
  }>;

export function getBulletsPool(count: number, actorService: TActorService): ReadonlyArray<Promise<TBullet>> {
  let bullets: ReadonlyArray<Promise<TBullet>> = [];

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count; i++) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    bullets = [
      ...bullets,
      BulletAsync(
        {
          name: `bullet_${i}`,
          type: ActorType.Sphere,
          radius: 0.3,
          material: { type: MaterialType.Standard, params: { color: '#FF0000' } },
          // physics: {
          //   type: RigidBodyTypesNames.Dynamic,
          //   collisionShape: CollisionShape.Sphere,
          //   mass: 1,
          //   friction: 0.5,
          //   restitution: 0,
          //   shapeParams: { radius: 0.1 },
          //   position: { x: 0, y: 0, z: 0 }
          // },
          position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
          castShadow: false,
          tags: []
        },
        actorService
      )
    ];
  }

  return bullets;
}

export async function BulletAsync(params: TActorParams, actorService: TActorService): Promise<TBullet> {
  const actor: TActorWrapperAsync = await actorService.createAsync(params);
  let distanceTraveled: number = 0;
  let fallSpeed: number = 0;
  let active: boolean = false;

  const setDistanceTraveled = (dist: number): void => void (distanceTraveled = dist);
  const getDistanceTraveled = (): number => distanceTraveled;
  const setFallSpeed = (speed: number): void => void (fallSpeed = speed);
  const getFallSpeed = (): number => fallSpeed;
  const setActive = (act: boolean): void => void (active = act);
  const isActive = (): boolean => active;

  function reset(): void {
    actor.setPosition(Vector3Wrapper({ x: 0, y: 0, z: 0 }));
    actor.setKinematicAzimuth(0);
    actor.setKinematicElevation(0);
    setDistanceTraveled(0);
    setActive(false);
    // eslint-disable-next-line functional/immutable-data
    actor.entity.visible = false;
    collisionsService.updateObjectInGrid(actor.entity);
  }

  function update(delta: number): void {
    if (isActive()) {
      const azimuthRadians: number = MathUtils.degToRad(actor.getKinematicAzimuth());
      const elevationRadians: number = MathUtils.degToRad(actor.getKinematicElevation());
      const vectorDirection: Vector3 = new Vector3(Math.cos(elevationRadians) * Math.cos(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.sin(azimuthRadians));
      // const vectorDirection: Vector3 = new Vector3(Math.cos(azimuthRadians), elevationRadians, Math.sin(azimuthRadians));
      actor.entity.position.add(vectorDirection.clone().multiplyScalar(mpsSpeed(actor.getKinematicSpeed(), delta)));

      // TODO (S.Panfilov) this is a very naive implementation of gravity (a real bullet flying in more complex half parabola)
      // eslint-disable-next-line functional/immutable-data
      actor.entity.position.y = actor.entity.position.y - mpsSpeed(fallSpeed, delta);

      setDistanceTraveled(getDistanceTraveled() + mpsSpeed(actor.getKinematicSpeed(), delta));

      const collisionCheckRadius: number = meters(5);
      const collision = collisionsService.checkCollision(actor, collisionCheckRadius);
      if (collision) {
        console.log('Hit detected', collision);
        // reset(actor);
        // } else if (actor.position.distanceTo(actor.startPosition) > maxDistance) {
        //   resetBullet(actor);
      }
    }
  }

  return {
    ...actor,
    setDistanceTraveled,
    getDistanceTraveled,
    setFallSpeed,
    getFallSpeed,
    setActive,
    isActive,
    reset,
    update
  };
}

export function shoot(actorPosition: TWithCoordsXYZ, toAngle: number, elevation: number, speedMeters: number, fallSpeedMeters: number, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet) => !b.isActive());
  if (isDefined(bullet)) {
    bullet.setPosition(Vector3Wrapper(actorPosition));
    bullet.setKinematicAzimuth(toAngle);
    bullet.setKinematicElevation(elevation);
    bullet.setDistanceTraveled(0);
    bullet.setFallSpeed(meters(fallSpeedMeters));
    bullet.setKinematicSpeed(meters(speedMeters));
    bullet.setActive(true);
  }
}

export function updateBullets(bullets: ReadonlyArray<TBullet>, delta: number): void {
  bullets.forEach((bullet: TBullet): void => bullet.update(delta));
}
