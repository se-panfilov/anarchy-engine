import type {
  TActor,
  TActorParams,
  TActorService,
  TAnyMaterialWrapper,
  TCollisionCheckResult,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TLightService,
  TMaterialService,
  TMetersPerSecond,
  TMilliseconds,
  TModel3d,
  TModels3dService,
  TMouseService,
  TMouseWatcherEvent,
  TPointLightWrapper,
  TReadonlyVector3,
  TSceneWrapper,
  TSpatialGridService,
  TSpatialGridWrapper
} from '@Anarchy/Engine';
import { getTags, LoopUpdatePriority, MaterialType, metersPerSecond, mpsSpeed, PrimitiveModel3dType, TransformAgent } from '@Anarchy/Engine';
import { meters } from '@Anarchy/Engine/Measurements/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { RigidBody } from '@dimforge/rapier3d';
import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs';
import { BufferAttribute, BufferGeometry, Color, Euler, PointsMaterial, Vector3 } from 'three';
import { Points } from 'three/src/objects/Points';

import { createFlashLight } from '@/Levels/Showcase20PhysicsShooter/utils/Light';

export const BULLET_TAG = 'bullet';
export const BULLET_TARGET_TAG = 'target';

export type TBullet = TActor &
  Readonly<{
    setDistanceTraveled: (dist: number) => void;
    getDistanceTraveled: () => number;
    setActive: (act: boolean) => void;
    isActive: () => boolean;
    reset: () => void;
    update: (delta: TMilliseconds) => void;
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
  const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');
  const material: TAnyMaterialWrapper = materialService.create({ name: 'bullet_material', type: MaterialType.Standard, options: { color: '#FF0000' } });

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count; i++) {
    const id: string = nanoid();

    const model3d: TModel3d = models3dService.create({
      name: `bullet_${i}_${id}_model3d`,
      model3dSource: PrimitiveModel3dType.Cube,
      animationsSource: [],
      material,
      options: {
        width: meters(0.3),
        height: meters(0.3),
        depth: meters(0.5)
      },
      position: new Vector3(),
      rotation: new Euler(0, 0, 0),
      castShadow: true,
      receiveShadow: false
    });

    bullets = [
      ...bullets,
      Bullet(
        {
          name: `bullet_${i}_${id}_actor`,
          model3dSource: model3d,
          position: new Vector3(),
          rotation: new Euler(0, 1.57, 0),
          agent: TransformAgent.Kinematic,
          spatial: { grid, isAutoUpdate: true, updatePriority: LoopUpdatePriority.ASAP },
          collisions: { isAutoUpdate: true },
          kinematic: {
            state: {
              linearSpeed: metersPerSecond(5)
            },
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

export function Bullet(params: TActorParams, actorService: TActorService): TBullet {
  const actor: TActor = actorService.create(params);
  let distanceTraveled: number = 0;
  const maxDistance: number = 50;
  let active: boolean = false;

  const setDistanceTraveled = (dist: number): void => void (distanceTraveled = dist);
  const getDistanceTraveled = (): number => distanceTraveled;

  function setActive(act: boolean): void {
    actor.collisions.autoUpdate$.next(act);

    // (actor.model3d.getRawModel3d() as Mesh).visible = true;
    active = act;
  }

  const isActive = (): boolean => active;

  actor.collisions.autoUpdate$.next(false);

  function reset(): void {
    actor.drive.position$.next(new Vector3(0, 0, 0));
    actor.drive.kinematic.resetLinear(true, true);
    setDistanceTraveled(0);
    setActive(false);

    // (actor.model3d.getRawModel3d() as Mesh).visible = false;
  }

  actor.collisions.value$.subscribe(reset);

  function update(delta: TMilliseconds): void {
    if (isActive()) {
      // TODO wtf this calculation is doing?
      // const azimuthRadians: TRadians = actor.drive.kinematic.getLinearDirection();
      // const elevationRadians: TRadians = actor.drive.kinematic.getLinearElevation();
      // const vectorDirection: Vector3 = new Vector3(Math.cos(elevationRadians) * Math.cos(azimuthRadians), Math.sin(elevationRadians), Math.cos(elevationRadians) * Math.sin(azimuthRadians));
      // actor.drive.kinematic.setLinearDirection(vectorDirection);

      setDistanceTraveled(getDistanceTraveled() + mpsSpeed(actor.drive.kinematic.getLinearSpeed(), delta));
      if (getDistanceTraveled() > maxDistance) reset();
    }
  }

  actor.collisions.setCollisionsFilterFn((actor: TActor): boolean => getTags(actor).includes(BULLET_TARGET_TAG));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(actor, {
    setDistanceTraveled,
    getDistanceTraveled,
    setActive,
    isActive,
    reset,
    update,
    hit$: actor.collisions.value$
  });
}

export function prepareShooting(
  actor: TActor,
  mouseService: TMouseService,
  intersectionsWatcher: TIntersectionsCameraWatcher,
  shootingParams: Readonly<{ cooldownMs: number; speed: TMetersPerSecond }>,
  bullets: ReadonlyArray<TBullet>
): void {
  let idx: ReturnType<typeof setTimeout> | number = 0;
  mouseService.clickLeftPress$.pipe(withLatestFrom(intersectionsWatcher.value$)).subscribe(([, intersection]: [TMouseWatcherEvent, TIntersectionEvent]): void => {
    if (isNotDefined(intersection)) throw new Error('Intersection not defined');
    shoot(actor.drive.position$.value, intersection.point, shootingParams.speed, bullets);
    // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    idx = setInterval((): void => {
      shoot(actor.drive.position$.value, intersection.point, shootingParams.speed, bullets);
    }, shootingParams.cooldownMs);
  });
  mouseService.clickLeftRelease$.subscribe((): void => {
    if (idx) clearInterval(idx);
  });
}

export function shoot(actorPosition: TReadonlyVector3, target: TReadonlyVector3, speed: TMetersPerSecond, bullets: ReadonlyArray<TBullet>): void {
  const bullet: TBullet | undefined = bullets.find((b: TBullet): boolean => !b.isActive());
  if (isDefined(bullet)) {
    bullet.drive.position$.next(actorPosition);
    bullet.setDistanceTraveled(0);
    bullet.drive.kinematic.moveTo(target, speed);
    bullet.setActive(true);
  }
}

export function updateBullets(bullets: ReadonlyArray<TBullet>, delta: TMilliseconds): void {
  bullets.forEach((bullet: TBullet): void => bullet.update(delta));
}

export function createHitEffect(position: Vector3, sceneW: TSceneWrapper, lightService: TLightService): void {
  const particleCount = 100;
  const particles = new BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < particleCount; i++) {
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

  const lightW: TPointLightWrapper = createFlashLight(lightService, position, new Color('#FF0000'), 100, 50);

  sceneW.entity.add(particleSystem);
  // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
  setTimeout((): void => {
    sceneW.entity.remove(particleSystem);
    sceneW.entity.remove(lightW.entity);
  }, 500);
}

export function applyExplosionImpulse(actor: TActor, collisionPoint: Vector3, explosionForce: number): void {
  const body: RigidBody | undefined = actor.drive.physics?.physicsBody$.value?.getRigidBody();
  if (isNotDefined(body)) return;

  const bodyPosition = new Vector3(body.translation().x, body.translation().y, body.translation().z);

  const direction: Vector3 = new Vector3().subVectors(bodyPosition, collisionPoint).normalize();
  const impulse: Vector3 = direction.multiplyScalar(explosionForce);

  body.applyImpulseAtPoint({ x: impulse.x, y: impulse.y, z: impulse.z }, { x: collisionPoint.x, y: collisionPoint.y, z: collisionPoint.z }, true);
}
