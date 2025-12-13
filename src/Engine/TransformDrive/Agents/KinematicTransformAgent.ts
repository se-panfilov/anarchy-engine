import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Object3D, Quaternion, Vector3 } from 'three';
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

  const tempObject = new Object3D();

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    kinematicSub$?.unsubscribe();

    abstractTransformAgent.destroy$.next();

    tempObject.parent?.remove(tempObject);
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
    // Rotates agent to "look" at the target position (e.g. mouse click position, other actor, etc.)
    lookAt(targetPosition: Vector3, speed: TMetersPerSecond, radius: TMeters): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');

      tempObject.position.copy(abstractTransformAgent.position$.value);
      tempObject.up.set(0, 1, 0);
      tempObject.lookAt(targetPosition);
      const targetRotation: Quaternion = tempObject.quaternion.clone().normalize();

      return agent.rotateTo(targetRotation, speed, radius);
    },
    // Rotates agent as provided Quaternion (useful when you want to rotate as someone else already rotated)
    rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void | never {
      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      // TODO 8.0.0. MODELS: TRadiansPerSecond
      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = targetRotation.clone().normalize();

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

    const rotationStep: TRadians = (agent.data.state.angularSpeed * delta) as TRadians;
    const stepRotation: Quaternion | undefined = getStepRotation(agent, rotationStep);
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

  return agent;
}

function getStepRotation(agent: TKinematicTransformAgent, rotationStep: TRadians): Quaternion | undefined {
  if (isNotDefined(agent.data.target?.rotation)) return undefined;

  const currentRotation: Quaternion = agent.rotation$.value.clone().normalize();
  const targetNormalized: Quaternion = agent.data.target.rotation.clone().normalize();

  // Compute relative rotation
  const qRelative: Quaternion = currentRotation.clone().invert().multiply(targetNormalized);

  // Clamp w to avoid floating-point errors outside [-1,1]
  const clampedW: number = Math.min(Math.max(qRelative.w, -1), 1);
  const angle: TRadians = (2 * Math.acos(clampedW)) as TRadians;

  // Compute rotation axis
  const sinHalfAngle: number = Math.sqrt(1 - clampedW * clampedW);
  const axis: Vector3 = sinHalfAngle > 1e-6 ? new Vector3(qRelative.x, qRelative.y, qRelative.z).divideScalar(sinHalfAngle).normalize() : new Vector3(0, 1, 0);

  // Fix for shortest rotation path
  const correctedAngle: number = angle > Math.PI ? angle - 2 * Math.PI : angle;
  const stepAngle: number = Math.sign(correctedAngle) * Math.min(Math.abs(correctedAngle), rotationStep);

  return stepAngle !== 0 ? new Quaternion().setFromAxisAngle(axis, stepAngle) : undefined;
}

// Fallback implementation for getStepRotation based on Euler angles
// function getStepRotation(agent: TKinematicTransformAgent, rotationStep: number): Quaternion | undefined {
//   if (!agent.data.target?.rotation) return undefined;
//
//   const currentEuler = new Euler().setFromQuaternion(agent.rotation$.value, 'YXZ');
//   const targetEuler = new Euler().setFromQuaternion(agent.data.target.rotation, 'YXZ');
//
//   const deltaX = targetEuler.x - currentEuler.x;
//   const deltaY = targetEuler.y - currentEuler.y;
//   const deltaZ = targetEuler.z - currentEuler.z;
//
//   const stepEuler = new Euler(
//     Math.sign(deltaX) * Math.min(rotationStep, Math.abs(deltaX)),
//     Math.sign(deltaY) * Math.min(rotationStep, Math.abs(deltaY)),
//     Math.sign(deltaZ) * Math.min(rotationStep, Math.abs(deltaZ)),
//     'YXZ'
//   );
//
//   return new Quaternion().setFromEuler(stepEuler);
// }

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
