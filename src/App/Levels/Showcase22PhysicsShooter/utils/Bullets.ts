import { nanoid } from 'nanoid';
import { Vector3 } from 'three';

import type { TActorParams, TActorService, TActorWrapperAsync, TRadians, TWithCoordsXYZ } from '@/Engine';
import { ActorType, collisionsService, EulerWrapper, isDefined, MaterialType, mpsSpeed, Vector3Wrapper } from '@/Engine';
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
          name: `bullet_${i}_${nanoid()}`,
          type: ActorType.Cube,
          width: 0.3,
          height: 0.3,
          depth: 0.5,
          material: { type: MaterialType.Standard, params: { color: '#FF0000' } },
          position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
          rotation: EulerWrapper({ x: 0, y: 1.57, z: 0 }),
          castShadow: false,
          isKinematicAutoUpdate: true,
          kinematic: {
            linearSpeed: meters(5)
          },
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
    actor.kinematic.setLinearAzimuthRad(0);
    actor.kinematic.setLinearElevationRad(0);
    setDistanceTraveled(0);
    setActive(false);
    // eslint-disable-next-line functional/immutable-data
    actor.entity.visible = false;
    collisionsService.updateObjectInGrid(actor.entity);
  }

  function update(delta: number): void {
    if (isActive()) {
      const azimuthRadians: TRadians = actor.kinematic.getLinearAzimuthRad();
      const elevationRadians: TRadians = actor.kinematic.getLinearElevationRad();
      const vectorDirection: Vector3 = new Vector3(Math.cos(elevationRadians) * Math.cos(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.sin(azimuthRadians));
      actor.kinematic.setLinearDirection(vectorDirection);

      // TODO (S.Panfilov) this is a very naive implementation of gravity (a real bullet flying in more complex half parabola)
      // eslint-disable-next-line functional/immutable-data
      // actor.entity.position.y = actor.entity.position.y - mpsSpeed(fallSpeed, delta);

      setDistanceTraveled(getDistanceTraveled() + mpsSpeed(actor.kinematic.getLinearSpeed(), delta));

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

export function shoot(actorPosition: TWithCoordsXYZ, toAngle: TRadians, elevation: TRadians, speedMeters: number, fallSpeedMeters: number, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet) => !b.isActive());
  if (isDefined(bullet)) {
    bullet.setPosition(Vector3Wrapper(actorPosition));
    bullet.kinematic.setLinearAzimuthRad(toAngle);
    bullet.kinematic.setLinearElevationRad(elevation);
    bullet.setDistanceTraveled(0);
    bullet.setFallSpeed(meters(fallSpeedMeters));
    bullet.kinematic.setLinearSpeed(meters(speedMeters));
    bullet.setActive(true);
  }
}

export function updateBullets(bullets: ReadonlyArray<TBullet>, delta: number): void {
  bullets.forEach((bullet: TBullet): void => bullet.update(delta));
}
