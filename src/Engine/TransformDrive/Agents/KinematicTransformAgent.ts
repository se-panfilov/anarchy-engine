import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TKinematicData, TKinematicState, TKinematicTarget, TKinematicWritableData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine/Math';
import { getAzimuthFromDirection, getElevationFromDirection } from '@/Engine/Math';
import { radians } from '@/Engine/Measurements';
import type { TReadonlyEuler, TReadonlyQuaternion } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined, isQuaternionLike } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoopService }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? false);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(
    isQuaternionLike(params.rotation) ? new Quaternion().copy(params.rotation) : new Quaternion().setFromEuler(params.rotation)
  );
  // TODO 8.0.0. MODELS: Refactor abstractTransformAgent to use quaternions, so no need in this subscription
  const rotationQuaternionSub$: Subscription = rotationQuaternion$.pipe(map((q: TReadonlyQuaternion): TReadonlyEuler => new Euler().setFromQuaternion(q))).subscribe(abstractTransformAgent.rotation$);

  let kinematicSub$: Subscription | undefined = undefined;

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    kinematicSub$?.unsubscribe();
    rotationQuaternionSub$?.unsubscribe();

    //Complete subjects
    rotationQuaternion$.complete();
    rotationQuaternion$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TKinematicWritableData }> = {
    ...abstractTransformAgent,
    rotationQuaternion$,
    data: {
      state: {
        linearSpeed: params.state.linearSpeed ?? 0,
        linearDirection: params.state.linearDirection?.clone() ?? new Vector3(),
        angularSpeed: params.state.angularSpeed ?? 0,
        angularDirection: params.state.angularDirection?.clone() ?? new Quaternion()
      },
      target: {
        positionThreshold: 0.01,
        position: undefined,
        rotationThreshold: 0.0001,
        rotation: undefined
      }
    },
    setData({ state, target }: TKinematicData): void {
      const { linearSpeed, linearDirection, angularSpeed, angularDirection } = state;
      const { positionThreshold, position, rotationThreshold, rotation } = target ?? {};

      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearDirection.copy(linearDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularDirection.copy(angularDirection);

      if (isNotDefined(target)) return;

      // eslint-disable-next-line functional/immutable-data
      if (isDefined(positionThreshold)) agent.data.target.positionThreshold = positionThreshold;
      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = position;
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(rotationThreshold)) agent.data.target.rotationThreshold = rotationThreshold;
      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = rotation;
    },
    getData(): TKinematicData {
      return agent.data;
    },
    // TODO CWP
    // TODO 8.0.0. MODELS: Refactor this code. It's working, but it's a mess atm.
    // TODO 8.0.0. MODELS: with showcase multiple "moveTo" in the same direction increases the speed, while opposite directions stopped the model
    moveTo(targetPosition: Vector3, speed: TMetersPerSecond): void {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setLinearSpeed(0);

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = targetPosition;

      // If the agent is already at the target, do not move
      if (targetPosition.equals(abstractTransformAgent.position$.value)) return agent.setLinearSpeed(0);

      agent.setLinearDirection(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
      agent.setLinearSpeed(speed);

      // const vectorToTarget = new Vector3();
      //
      // // TODO 8.0.0. MODELS: Refactor this subscription.
      // const subscription = kinematicLoopService.tick$.subscribe((): void => {
      //   // If the agent is already at the target, do not move
      //   if (agent.getLinearSpeed() === 0) return subscription.unsubscribe();
      //
      //   const currentPosition = abstractTransformAgent.position$.value;
      //   vectorToTarget.copy(targetPosition).sub(currentPosition);
      //
      //   const distanceSquared = vectorToTarget.lengthSq();
      //
      //   // If the agent is close enough to the target, stop the agent
      //   if (distanceSquared < epsilon * epsilon) {
      //     agent.setLinearSpeed(0);
      //     return subscription.unsubscribe();
      //   }
      //
      //   const dotProduct = vectorToTarget.dot(agent.getLinearDirection());
      //   // If the agent has passed the target, stop the agent
      //   if (dotProduct < 0) {
      //     agent.setLinearSpeed(0);
      //     return subscription.unsubscribe();
      //   }
      //
      //   // If the agent has crossed the target (e.g. in a single frame), stop the agent
      //   const crossedTarget = vectorToTarget.dot(direction) < 0;
      //   if (crossedTarget) {
      //     agent.setLinearSpeed(0);
      //     return subscription.unsubscribe();
      //   }
      // });
    },
    // TODO 8.0.0. MODELS: Refactor this code. It's working, but it's a mess atm.
    rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void | never {
      const epsilon = 0.0001;
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;

      // Calculate angle to the target using dot product
      const dot: number = rotationQuaternion$.value.dot(targetRotation);
      const angleToTarget: number = Math.acos(2 * dot * dot - 1);
      if (angleToTarget < epsilon) return agent.setAngularSpeed(0);

      agent.setAngularDirection(targetRotation);
      agent.setAngularSpeed(angularSpeed);

      // TODO 8.0.0. MODELS: Refactor this subscription. Most of these things could be done in doKinematicRotation
      const subscription: Subscription = kinematicLoopService.tick$.subscribe((deltaTime: TMilliseconds): void => {
        // If the speed is 0, do nothing
        if (agent.getAngularSpeed() === 0) return subscription.unsubscribe();

        // If the agent is close enough to the target, stop the agent
        const dot: number = rotationQuaternion$.value.dot(targetRotation);
        const angleToTarget: number = Math.acos(2 * dot * dot - 1);
        if (angleToTarget < epsilon) {
          agent.setAngularSpeed(0);
          return subscription.unsubscribe();
        }

        const rotationStep: number = angularSpeed * deltaTime;
        const stepRotation: Quaternion = new Quaternion().setFromAxisAngle(agent.data.state.angularDirection, rotationStep);
        const newRotation: Quaternion = new Quaternion().multiplyQuaternions(rotationQuaternion$.value, stepRotation).normalize();

        // Recalculate angle after applying step rotation
        const newDot: number = newRotation.dot(targetRotation);
        const angleAfterStep: TRadians = Math.acos(2 * newDot * newDot - 1) as TRadians;

        // If the agent has passed the target, stop the agent
        if (angleAfterStep > angleToTarget) {
          agent.setAngularSpeed(0);
          return subscription.unsubscribe();
        }
      });
    },
    adjustDataByLinearVelocity(linearVelocity: Quaternion): void {
      const { x, y, z, w } = linearVelocity;
      const speed = (2 * Math.sqrt(x * x + y * y + z * z)) as TMetersPerSecond;
      // Normalize the linear velocity quaternion only if it's not already normalized
      const normalizedLinearVelocity: Quaternion = Math.abs(linearVelocity.lengthSq() - 1) > 1e-6 ? new Quaternion(x, y, z, w).normalize() : linearVelocity.clone();

      agent.setLinearSpeed(speed);
      agent.setLinearDirection(normalizedLinearVelocity);
    },
    adjustDataFromAngularVelocity(angularVelocity: Quaternion): void {
      const angularSpeed: TMetersPerSecond = angularVelocity.angleTo(new Quaternion()) as TMetersPerSecond;
      agent.setAngularSpeed(angularSpeed);
      agent.setAngularDirection(angularVelocity.clone().normalize());
    },
    getLinearSpeed(): TMetersPerSecond {
      return agent.data.state.linearSpeed;
    },
    setLinearSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = speed;
    },
    getLinearDirection(): Vector3 {
      return agent.data.state.linearDirection;
    },
    setLinearDirection(direction: Vector3Like): void {
      agent.data.state.linearDirection.copy(direction);
    },
    setLinearDirectionFromParams(azimuthRad: TRadians, elevationRad: TRadians): void {
      agent.setLinearAzimuth(azimuthRad);
      agent.setLinearElevation(elevationRad);
    },
    getLinearAzimuth(): TRadians {
      return getAzimuthFromDirection(agent.data.state.linearDirection);
    },
    setLinearAzimuth(azimuthRad: TRadians): void {
      const elevation = agent.getLinearElevation();
      const quaternion = new Quaternion().setFromEuler(new Euler(elevation, azimuthRad, 0, 'ZYX'));
      agent.setLinearDirection(quaternion);
    },
    getLinearElevation(): TRadians {
      return getElevationFromDirection(agent.data.state.linearDirection);
    },
    setLinearElevation(elevationRad: TRadians): void {
      const azimuth = this.getLinearAzimuth(); // Get current azimuth
      const quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuth, 0, 'ZYX'));
      agent.setLinearDirection(quaternion);
    },
    getAngularSpeed(): TMetersPerSecond {
      return agent.data.state.angularSpeed;
    },
    setAngularSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = speed;
    },
    getAngularDirection(): Quaternion {
      return agent.data.state.angularDirection.clone();
    },
    setAngularDirection(direction: QuaternionLike): void {
      agent.data.state.angularDirection.copy(direction);
    },
    setAngularDirectionFromParams(azimuthRad: TRadians, elevationRad: TRadians): void {
      const quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuthRad, 0, 'ZYX')); // Convert azimuth and elevation to Quaternion
      agent.setAngularDirection(quaternion);
    },
    getAngularAzimuth(): TRadians {
      // TODO debug
      // return getAzimutFromQuaternionDirection(agent.data.state.angularDirection);
      return getAzimuthFromDirection(new Euler().setFromQuaternion(agent.data.state.angularDirection));
    },
    setAngularAzimuth(azimuthRad: TRadians): void {
      // const elevation = agent.getAngularElevation();
      // const quaternion = new Quaternion().setFromEuler(new Euler(elevation, azimuthRad, 0, 'ZYX'));
      // agent.data.state.angularDirection.copy(quaternion);

      const lengthXZ: number = Math.sqrt(agent.data.state.angularDirection.x ** 2 + agent.data.state.angularDirection.z ** 2) || 1;
      const quaternion = new Quaternion().setFromEuler(new Euler(Math.cos(azimuthRad) * lengthXZ, agent.data.state.angularDirection.y, Math.sin(azimuthRad) * lengthXZ));

      // console.log('XXX2', radToDeg(new Euler().setFromQuaternion(agent.data.state.angularDirection).z));

      agent.data.state.angularDirection.copy(quaternion);
    },
    getAngularElevation(): TRadians {
      // TODO debug
      // return getElevationFromQuaternionDirection(agent.data.state.angularDirection);
      return getElevationFromDirection(agent.data.state.angularDirection);
    },
    setAngularElevation(elevationRad: TRadians): void {
      // const azimuth: TRadians = agent.getAngularAzimuth();
      // const quaternion: Quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuth, 0, 'ZYX'));
      // agent.data.state.angularDirection.copy(quaternion);
      // This approach could lead to bugs, if the quaternion is not normalized
      // const azimuth: TRadians = agent.getAngularAzimuth();
      //
      // const sinElevation: TRadians = Math.sin(elevationRad) as TRadians;
      // const cosElevation: TRadians = Math.cos(elevationRad) as TRadians;
      //
      // const sinAzimuth: TRadians = Math.sin(azimuth) as TRadians;
      // const cosAzimuth: TRadians = Math.cos(azimuth) as TRadians;
      //
      // agent.data.state.angularDirection
      //   .set(
      //     cosElevation * cosAzimuth, // x
      //     sinElevation, // y
      //     cosElevation * sinAzimuth, // z
      //     Math.sqrt(1 - sinElevation ** 2) // w
      //   )
      //   .normalize();
    },
    setAngularVelocityFromParams(speed: TMetersPerSecond, azimuth: TRadians, elevation: TRadians): void {
      agent.setAngularSpeed(speed);
      agent.setAngularDirectionFromParams(azimuth, elevation);
    },
    autoUpdate$
  };

  // TODO 8.0.0. MODELS: Destroy subscriptions linearDirection & displacement on agent destroy
  const linearDirection = new Vector3();
  const displacement = new Vector3();

  function doKinematicMove(delta: TMilliseconds): void {
    if (agent.data.state.linearSpeed <= 0) return;

    if (isPointReached(agent.data.target, abstractTransformAgent.position$.value, agent.data.state)) return;

    linearDirection.copy(agent.data.state.linearDirection).normalize();
    displacement.copy(linearDirection).multiplyScalar(agent.data.state.linearSpeed * delta);

    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  // TODO 8.0.0. MODELS: Destroy subscriptions tempQuaternion on agent destroy
  const tempQuaternion: Quaternion = new Quaternion();
  const angleThreshold: TRadians = radians(0.0001);

  function doKinematicRotation(delta: TMilliseconds): void {
    if (agent.data.state.angularSpeed <= 0) return;

    const angle: TRadians = (agent.data.state.angularSpeed * delta) as TRadians;
    if (angle < angleThreshold) return;

    const quaternion: TReadonlyQuaternion = tempQuaternion.setFromAxisAngle(agent.data.state.angularDirection, angle);
    rotationQuaternion$.next(rotationQuaternion$.value.clone().multiply(quaternion));
  }

  kinematicSub$ = combineLatest([agent.enabled$, agent.autoUpdate$])
    .pipe(
      //Do not update if agent is disabled or autoUpdate is turned off
      switchMap(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): Observable<TMilliseconds> => (isEnabled && isAutoUpdate ? kinematicLoopService.tick$ : EMPTY))
    )
    .subscribe((delta: TMilliseconds): void => {
      doKinematicRotation(delta);
      doKinematicMove(delta);
    });

  return agent;
}

function isPointReached(target: TKinematicTarget | undefined, position: Vector3, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { position: targetPosition, positionThreshold } = target;
  if (isNotDefined(targetPosition)) return false;

  const { linearSpeed, linearDirection } = state;

  // If the agent is already at the target, do not move
  if (linearSpeed === 0) return true;

  const vectorToTarget: Vector3 = targetPosition.clone().sub(position);
  const distanceSquared: TMeters = vectorToTarget.lengthSq() as TMeters;

  // If the agent is close enough to the target, stop
  if (distanceSquared < positionThreshold * positionThreshold) return true;

  const crossedTarget: boolean = vectorToTarget.dot(linearDirection) < 0;
  // If the agent has passed the target, stop
  if (crossedTarget) return true;

  return false;
}
