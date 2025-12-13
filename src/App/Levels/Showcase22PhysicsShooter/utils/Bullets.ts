import type { RigidBody } from '@dimforge/rapier3d';
import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { BufferAttribute, BufferGeometry, Color, PointsMaterial, Vector3 } from 'three';
import { Points } from 'three/src/objects/Points';

import { createFlashLight } from '@/App/Levels/Showcase22PhysicsShooter/utils/Light';
import type {
  TActorParams,
  TActorService,
  TActorWrapperAsync,
  TCollisionCheckResult,
  TLightService,
  TMouseService,
  TRadians,
  TSceneWrapper,
  TSpatialGridService,
  TSpatialGridWrapper,
  TWithCoordsXYZ
} from '@/Engine';
import { EulerWrapper, isDefined, isNotDefined, MaterialType, Model3dType, mpsSpeed, SpatialUpdatePriority, Vector3Wrapper } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

export const BULLET_TAG = 'bullet';

export type TBullet = TActorWrapperAsync &
  Readonly<{
    setDistanceTraveled: (dist: number) => void;
    getDistanceTraveled: () => number;
    setActive: (act: boolean) => void;
    isActive: () => boolean;
    reset: () => void;
    update: (delta: number, spatialGrid: TSpatialGridWrapper) => void;
    hit$: Observable<TCollisionCheckResult>;
  }>;

export function getBulletsPool(count: number, actorService: TActorService, spatialGridService: TSpatialGridService): ReadonlyArray<Promise<TBullet>> {
  let bullets: ReadonlyArray<Promise<TBullet>> = [];
  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Failed to create bullet: Cannot find "main_grid" spatial grid`);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count; i++) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    bullets = [
      ...bullets,
      BulletAsync(
        {
          name: `bullet_${i}_${nanoid()}`,
          model3d: { url: Model3dType.Cube },
          width: 0.3,
          height: 0.3,
          depth: 0.5,
          material: { type: MaterialType.Standard, params: { color: '#FF0000' } },
          position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
          rotation: EulerWrapper({ x: 0, y: 1.57, z: 0 }),
          castShadow: true,
          spatial: { grid, isAutoUpdate: true, updatePriority: SpatialUpdatePriority.ASAP },
          collisions: { isAutoUpdate: true },
          kinematic: {
            linearSpeed: meters(5),
            isAutoUpdate: true
          },
          tags: [BULLET_TAG]
        },
        actorService
      )
    ];
  }

  return bullets;
}

export async function BulletAsync(params: TActorParams, actorService: TActorService): Promise<TBullet> {
  const actorW: TActorWrapperAsync = await actorService.createAsync(params);
  let distanceTraveled: number = 0;
  const maxDistance: number = 50;
  let active: boolean = false;

  const setDistanceTraveled = (dist: number): void => void (distanceTraveled = dist);
  const getDistanceTraveled = (): number => distanceTraveled;

  function setActive(act: boolean): void {
    actorW.collisions.setAutoUpdate(act);
    // eslint-disable-next-line functional/immutable-data
    // (actorW.entity as Mesh).visible = true;
    active = act;
  }

  const isActive = (): boolean => active;

  actorW.collisions.setAutoUpdate(false);

  function reset(): void {
    actorW.setPosition(Vector3Wrapper({ x: 0, y: 0, z: 0 }));
    actorW.kinematic.setLinearAzimuthRad(0);
    actorW.kinematic.setLinearElevationRad(0);
    actorW.kinematic.setLinearSpeed(0);
    setDistanceTraveled(0);
    setActive(false);
    // eslint-disable-next-line functional/immutable-data
    // (actorW.entity as Mesh).visible = false;
  }

  actorW.collisions.value$.subscribe(reset);

  function update(delta: number): void {
    if (isActive()) {
      const azimuthRadians: TRadians = actorW.kinematic.getLinearAzimuthRad();
      const elevationRadians: TRadians = actorW.kinematic.getLinearElevationRad();
      const vectorDirection: Vector3 = new Vector3(Math.cos(elevationRadians) * Math.cos(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.sin(azimuthRadians));
      actorW.kinematic.setLinearDirection(vectorDirection);

      setDistanceTraveled(getDistanceTraveled() + mpsSpeed(actorW.kinematic.getLinearSpeed(), delta));
      if (getDistanceTraveled() > maxDistance) reset();
    }
  }

  actorW.collisions.setCollisionsFilterFn((actorW: TActorWrapperAsync): boolean => !actorW.getTags().includes(BULLET_TAG));

  return {
    ...actorW,
    setDistanceTraveled,
    getDistanceTraveled,
    setActive,
    isActive,
    reset,
    update,
    hit$: actorW.collisions.value$
  };
}

export function shootRapidFire(
  actorW: TActorWrapperAsync,
  mouseService: TMouseService,
  from: Readonly<{ azimuth: TRadians; elevation: TRadians }>,
  shootingParams: Readonly<{ cooldownMs: number; speed: number }>,
  bullets: ReadonlyArray<TBullet>
): void {
  let idx: ReturnType<typeof setTimeout> | number = 0;
  mouseService.clickLeftPress$.subscribe((): void => {
    shoot(actorW.getPosition().getCoords(), from.azimuth, from.elevation, meters(shootingParams.speed), bullets);
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    idx = setInterval(() => {
      shoot(actorW.getPosition().getCoords(), from.azimuth, from.elevation, meters(shootingParams.speed), bullets);
    }, shootingParams.cooldownMs);
  });
  mouseService.clickLeftRelease$.subscribe((): void => {
    if (idx) clearInterval(idx);
  });
}

export function shoot(actorPosition: TWithCoordsXYZ, toAngle: TRadians, elevation: TRadians, speedMeters: number, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet) => !b.isActive());
  if (isDefined(bullet)) {
    bullet.setPosition(Vector3Wrapper(actorPosition));
    bullet.kinematic.setLinearAzimuthRad(toAngle);
    bullet.kinematic.setLinearElevationRad(elevation);
    bullet.setDistanceTraveled(0);
    bullet.kinematic.setLinearSpeed(meters(speedMeters));
    bullet.setActive(true);
  }
}

export function updateBullets(bullets: ReadonlyArray<TBullet>, delta: number, spatialGrid: TSpatialGridWrapper): void {
  bullets.forEach((bullet: TBullet): void => bullet.update(delta, spatialGrid));
}

export function createHitEffect(position: Vector3, sceneW: TSceneWrapper, lightService: TLightService): void {
  const particleCount = 100;
  const particles = new BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i = 0; i < particleCount; i++) {
    // eslint-disable-next-line functional/immutable-data
    positions[i * 3] = position.x + (Math.random() - 0.5) * 0.9;
    // eslint-disable-next-line functional/immutable-data
    positions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 0.9;
    // eslint-disable-next-line functional/immutable-data
    positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.9;
  }

  particles.setAttribute('position', new BufferAttribute(positions, 3));

  const material = new PointsMaterial({ color: 0xff0000, size: 0.09 });

  const particleSystem = new Points(particles, material);

  const lightW = createFlashLight(lightService, position, new Color('#ff0000'), 100, 50);

  sceneW.entity.add(particleSystem);
  // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setTimeout(() => {
    sceneW.entity.remove(particleSystem);
    sceneW.entity.remove(lightW.entity);
  }, 500);
}

export function applyExplosionImpulse(actorW: TActorWrapperAsync, collisionPoint: Vector3, explosionForce: number): void {
  const body: RigidBody | undefined = actorW.physicsBody?.getRigidBody();
  if (isNotDefined(body)) return;

  const bodyPosition = new Vector3(body.translation().x, body.translation().y, body.translation().z);

  const direction = new Vector3().subVectors(bodyPosition, collisionPoint).normalize();
  const impulse = direction.multiplyScalar(explosionForce);

  body.applyImpulseAtPoint({ x: impulse.x, y: impulse.y, z: impulse.z }, { x: collisionPoint.x, y: collisionPoint.y, z: collisionPoint.z }, true);
}
