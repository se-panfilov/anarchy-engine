import { MathUtils, Vector3 } from 'three';

import type { TActorParams, TActorService, TActorWrapperAsync, TWithCoordsXYZ } from '@/Engine';
import { ActorType, isDefined, MaterialType, Vector3Wrapper } from '@/Engine';

export type TBullet = TActorWrapperAsync &
  Readonly<{
    setDirection: (azimuth: number) => void;
    getDirection: () => number;
    setElevation: (elev: number) => void;
    getElevation: () => number;
    setDistanceTraveled: (dist: number) => void;
    getDistanceTraveled: () => number;
    setActive: (act: boolean) => void;
    isActive: () => boolean;
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
  let direction: number = 0;
  let elevation: number = 0;
  let distanceTraveled: number = 0;
  let active: boolean = false;

  return {
    ...actor,
    setDirection: (azimuth: number): void => void (direction = azimuth),
    getDirection: (): number => direction,
    setElevation: (elev: number): void => void (elevation = elev),
    getElevation: (): number => elevation,
    setDistanceTraveled: (dist: number): void => void (distanceTraveled = dist),
    getDistanceTraveled: (): number => distanceTraveled,
    setActive: (act: boolean): void => void (active = act),
    isActive: (): boolean => active
  };
}

export function shoot(actorPosition: TWithCoordsXYZ, toAngle: number, elevation: number, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet) => !b.isActive());
  if (isDefined(bullet)) {
    bullet.setPosition(Vector3Wrapper(actorPosition));
    bullet.setDirection(toAngle);
    bullet.setElevation(elevation);
    bullet.setDistanceTraveled(0);
    bullet.setActive(true);
  }
}

export function updateBullets(bullets: ReadonlyArray<TBullet>, delta: number): void {
  const bulletSpeed: number = 10;

  bullets.forEach((bullet: TBullet): void => {
    if (bullet.isActive()) {
      const azimuthRadians: number = MathUtils.degToRad(bullet.getDirection());
      const elevationRadians: number = MathUtils.degToRad(bullet.getElevation());
      const vectorDirection: Vector3 = new Vector3(Math.cos(azimuthRadians), elevationRadians, Math.sin(azimuthRadians));
      bullet.entity.position.add(vectorDirection.clone().multiplyScalar(bulletSpeed * delta));
      bullet.setDistanceTraveled(bullet.getDistanceTraveled() + bulletSpeed * delta);

      // const collision = checkCollision(bullet);
      // if (collision) {
      //   console.log('Hit detected', collision);
      //   resetBullet(bullet);
      // } else if (bullet.distanceTraveled > maxDistance) {
      //   resetBullet(bullet);
      // }
    }
  });
}
