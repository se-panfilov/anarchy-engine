import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TKinematicData, TKinematicState, TKinematicTarget, TKinematicWritableData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine/Math';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoopService }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? false);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  let kinematicSub$: Subscription | undefined = undefined;

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    kinematicSub$?.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TKinematicWritableData }> = {
    ...abstractTransformAgent,
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
        // TODO 8.0.0. MODELS: rename "rotation" to "angularDirection"
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
    moveTo(targetPosition: Vector3, speed: TMetersPerSecond): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setLinearSpeed(0);

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = targetPosition;

      // If the agent is already at the target, do not move
      if (targetPosition.equals(abstractTransformAgent.position$.value)) return agent.setLinearSpeed(0);

      agent.setLinearDirection(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
      agent.setLinearSpeed(speed);
      return undefined;
    },
    // lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void {
    //   if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
    //   if (speed === 0) return agent.setAngularSpeed(0);
    //   if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
    //   const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;
    //
    //   // eslint-disable-next-line functional/immutable-data
    //   agent.data.target.position = targetPosition;
    //
    //   // Calculate angle to the target using dot product
    //   const dot: number = agent.data.state.linearDirection.dot(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
    //   const angleToTarget: number = Math.acos(2 * dot * dot - 1);
    //   if (angleToTarget < agent.data.target.rotationThreshold) return agent.setAngularSpeed(0);
    //
    //   agent.setAngularDirection(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
    //   agent.setAngularSpeed(angularSpeed);
    //
    //   return undefined;
    // },
    rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = targetRotation;

      // Calculate angle to the target using dot product
      const dot: number = agent.rotation$.value.dot(targetRotation);
      const angleToTarget: number = Math.acos(2 * dot * dot - 1);
      if (angleToTarget < agent.data.target.rotationThreshold) return agent.setAngularSpeed(0);

      // agent.setAngularDirection(targetRotation);
      agent.setAngularSpeed(angularSpeed);

      return undefined;
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
    resetLinear(resetSpeed: boolean, resetDirection: boolean): void {
      if (resetSpeed) agent.setLinearSpeed(0);
      if (resetDirection) agent.setLinearDirection(new Vector3());
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
    resetAngular(resetSpeed: boolean, resetDirection: boolean): void {
      if (resetSpeed) agent.setAngularSpeed(0);
      if (resetDirection) agent.setAngularDirection(new Quaternion());
    },
    autoUpdate$
  };

  // TODO 8.0.0. MODELS: Destroy subscriptions linearDirection & displacement on agent destroy
  const linearDirection = new Vector3();
  const displacement = new Vector3();

  // TODO 8.0.0. MODELS: Implement infinite move when no target (undefined)
  function doKinematicMove(delta: TMilliseconds): void {
    if (agent.data.state.linearSpeed <= 0) return;

    if (isPointReached(agent.data.target, abstractTransformAgent.position$.value, agent.data.state)) return;

    linearDirection.copy(agent.data.state.linearDirection).normalize();
    displacement.copy(linearDirection).multiplyScalar(agent.data.state.linearSpeed * delta);

    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  // TODO 8.0.0. MODELS: Implement infinite rotation when no target (undefined)
  function doKinematicRotation(delta: TMilliseconds): void {
    if (agent.data.state.angularSpeed <= 0) return;
    if (isRotationReached(agent.data.target, agent.rotation$.value, agent.data.state)) return;

    const rotationStep: number = agent.data.state.angularSpeed * delta;
    const stepRotation: Quaternion | undefined = getStepRotation(rotationStep);
    if (isNotDefined(stepRotation)) return;

    agent.data.state.angularDirection.multiply(stepRotation).normalize();
    agent.rotation$.next(agent.data.state.angularDirection);
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

  function getStepRotation(rotationStep: number): Quaternion | undefined {
    if (isNotDefined(agent.data.target.rotation)) return undefined;
    // Calculate the relative rotation (difference between current and target)
    const relativeRotation: Quaternion = agent.data.target.rotation.clone().multiply(agent.data.state.angularDirection.clone().invert());

    // Extract the axis and angle of rotation from the relative rotation
    const axis = new Vector3();
    relativeRotation.normalize();

    // Compute the angle and axis of the relative rotation
    const angleToTarget: TRadians = (2 * Math.acos(relativeRotation.w)) as TRadians;
    const scaleFactor = Math.sqrt(1 - relativeRotation.w * relativeRotation.w);

    if (scaleFactor > 1e-6) {
      axis.set(relativeRotation.x / scaleFactor, relativeRotation.y / scaleFactor, relativeRotation.z / scaleFactor).normalize();
    } else {
      // If scaleFactor is too small, fallback to a default axis
      axis.set(1, 0, 0);
    }

    // Avoid division by zero if the angle is too small
    if (angleToTarget < 1e-6) return undefined;

    return new Quaternion().setFromAxisAngle(axis, Math.min(rotationStep, angleToTarget));
  }

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

function isRotationReached(target: TKinematicTarget | undefined, rotation: Quaternion, state: TKinematicState): boolean {
  if (isNotDefined(target)) return false;
  const { rotation: targetRotation, rotationThreshold } = target;

  if (isNotDefined(targetRotation)) return false;

  const { angularSpeed } = state;

  // If the speed is 0, do nothing
  if (angularSpeed === 0) return true;

  // Calculate the current angle to the target
  const angleToTarget: TRadians = rotation.angleTo(targetRotation) as TRadians;

  // If the agent is close enough to the target, stop
  if (angleToTarget < rotationThreshold) return true;

  return false;
}
