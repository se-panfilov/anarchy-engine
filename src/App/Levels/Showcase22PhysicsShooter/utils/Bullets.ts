import type { RigidBody } from '@dimforge/rapier3d';
import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { BufferAttribute, BufferGeometry, Color, Euler, PointsMaterial, Vector3 } from 'three';
import { Points } from 'three/src/objects/Points';

import { createFlashLight } from '@/App/Levels/Showcase22PhysicsShooter/utils/Light';
import type {
  TActor,
  TActorParams,
  TActorService,
  TCollisionCheckResult,
  TLightService,
  TMaterialService,
  TMaterialWrapper,
  TModel3d,
  TModels3dService,
  TMouseService,
  TRadians,
  TSceneWrapper,
  TSpatialGridService,
  TSpatialGridWrapper
} from '@/Engine';
import { isDefined, isNotDefined, MaterialType, mpsSpeed, PrimitiveModel3dType, SpatialUpdatePriority } from '@/Engine';
import { meters } from '@/Engine/Measurements/Utils';

export const BULLET_TAG = 'bullet';

export type TBullet = TActor &
  Readonly<{
    setDistanceTraveled: (dist: number) => void;
    getDistanceTraveled: () => number;
    setActive: (act: boolean) => void;
    isActive: () => boolean;
    reset: () => void;
    update: (delta: number, spatialGrid: TSpatialGridWrapper) => void;
    hit$: Observable<TCollisionCheckResult>;
  }>;

export function getBulletsPool(
  count: number,
  actorService: TActorService,
  models3dService: TModels3dService,
  materialService: TMaterialService,
  spatialGridService: TSpatialGridService
): ReadonlyArray<TBullet> {
  let bullets: ReadonlyArray<TBullet> = [];
  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Failed to create bullet: Cannot find "main_grid" spatial grid`);

  const materialW: TMaterialWrapper = materialService.create({ name: 'bullet_material', type: MaterialType.Standard, options: { color: '#FF0000' } });

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count; i++) {
    const id: string = nanoid();

    const model3d: TModel3d = models3dService.create({
      name: `bullet_${i}_${id}_model3d`,
      model3dSource: PrimitiveModel3dType.Cube,
      animationsSource: [],
      materialSource: materialW,
      options: {
        width: 0.3,
        height: 0.3,
        depth: 0.5
      },
      position: new Vector3(),
      rotation: new Euler(0, 0, 0),
      castShadow: true,
      receiveShadow: false
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    bullets = [
      ...bullets,
      BulletAsync(
        {
          name: `bullet_${i}_${id}_actor`,
          model3dSource: model3d,
          position: new Vector3(),
          rotation: new Euler(0, 1.57, 0),
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

export function BulletAsync(params: TActorParams, actorService: TActorService): TBullet {
  const actor: TActor = actorService.create(params);
  let distanceTraveled: number = 0;
  const maxDistance: number = 50;
  let active: boolean = false;

  const setDistanceTraveled = (dist: number): void => void (distanceTraveled = dist);
  const getDistanceTraveled = (): number => distanceTraveled;

  function setActive(act: boolean): void {
    actor.collisions.autoUpdate$.next(act);
    // eslint-disable-next-line functional/immutable-data
    // (actor.model3d.getRawModel3d() as Mesh).visible = true;
    active = act;
  }

  const isActive = (): boolean => active;

  actor.collisions.autoUpdate$.next(false);

  function reset(): void {
    actor.drive.position$.next(new Vector3(0, 0, 0));
    actor.drive.kinematic.setLinearAzimuthRad(0);
    actor.drive.kinematic.setLinearElevationRad(0);
    actor.drive.kinematic.setLinearSpeed(0);
    setDistanceTraveled(0);
    setActive(false);
    // eslint-disable-next-line functional/immutable-data
    // (actor.model3d.getRawModel3d() as Mesh).visible = false;
  }

  actor.collisions.value$.subscribe(reset);

  function update(delta: number): void {
    if (isActive()) {
      const azimuthRadians: TRadians = actor.drive.kinematic.getLinearAzimuthRad();
      const elevationRadians: TRadians = actor.drive.kinematic.getLinearElevationRad();
      const vectorDirection: Vector3 = new Vector3(Math.cos(elevationRadians) * Math.cos(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.sin(azimuthRadians));
      actor.drive.kinematic.setLinearDirection(vectorDirection);

      setDistanceTraveled(getDistanceTraveled() + mpsSpeed(actor.drive.kinematic.getLinearSpeed(), delta));
      if (getDistanceTraveled() > maxDistance) reset();
    }
  }

  actor.collisions.setCollisionsFilterFn((actor: TActor): boolean => !actor.getTags().includes(BULLET_TAG));

  return {
    ...actor,
    setDistanceTraveled,
    getDistanceTraveled,
    setActive,
    isActive,
    reset,
    update,
    hit$: actor.collisions.value$
  };
}

export function shootRapidFire(
  actor: TActor,
  mouseService: TMouseService,
  from: Readonly<{ azimuth: TRadians; elevation: TRadians }>,
  shootingParams: Readonly<{ cooldownMs: number; speed: number }>,
  bullets: ReadonlyArray<TBullet>
): void {
  let idx: ReturnType<typeof setTimeout> | number = 0;
  mouseService.clickLeftPress$.subscribe((): void => {
    shoot(actor.drive.getPosition(), from.azimuth, from.elevation, meters(shootingParams.speed), bullets);
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    idx = setInterval(() => {
      shoot(actor.drive.getPosition(), from.azimuth, from.elevation, meters(shootingParams.speed), bullets);
    }, shootingParams.cooldownMs);
  });
  mouseService.clickLeftRelease$.subscribe((): void => {
    if (idx) clearInterval(idx);
  });
}

export function shoot(actorPosition: Vector3, toAngle: TRadians, elevation: TRadians, speedMeters: number, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet) => !b.isActive());
  if (isDefined(bullet)) {
    bullet.drive.position$.next(actorPosition);
    bullet.drive.kinematic.setLinearAzimuthRad(toAngle);
    bullet.drive.kinematic.setLinearElevationRad(elevation);
    bullet.setDistanceTraveled(0);
    bullet.drive.kinematic.setLinearSpeed(meters(speedMeters));
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

export function applyExplosionImpulse(actor: TActor, collisionPoint: Vector3, explosionForce: number): void {
  const body: RigidBody | undefined = actor.physicsBody?.getRigidBody();
  if (isNotDefined(body)) return;

  const bodyPosition = new Vector3(body.translation().x, body.translation().y, body.translation().z);

  const direction = new Vector3().subVectors(bodyPosition, collisionPoint).normalize();
  const impulse = direction.multiplyScalar(explosionForce);

  body.applyImpulseAtPoint({ x: impulse.x, y: impulse.y, z: impulse.z }, { x: collisionPoint.x, y: collisionPoint.y, z: collisionPoint.z }, true);
}
