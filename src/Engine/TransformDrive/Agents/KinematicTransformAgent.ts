import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Object3D, Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import { metersPerSecond } from '@/Engine/Distance';
import type { TKinematicData, TKinematicWritableData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians, TRadiansPerSecond } from '@/Engine/Math';
import { meters } from '@/Engine/Measurements';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicSpeed, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { getStepRotation, isInstant, isPointReached, isRotationReached, moveInstantly, rotateInstantly } from '@/Engine/TransformDrive/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoopService }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? false);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  let kinematicSub$: Subscription | undefined = undefined;

  const tempObject = new Object3D();
  // TODO 8.0.0. MODELS: Destroy subscriptions linearDirection & displacement on agent destroy
  const linearDirection = new Vector3();
  const displacement = new Vector3();

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
        radius: params.state.radius ?? meters(1),
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
    getRadius(): TMeters {
      return agent.data.state.radius;
    },
    setRadius(radius: TMeters): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.radius = radius;
    },
    moveTo(targetPosition: Vector3, speed: TKinematicSpeed): void | never {
      if (isInstant(speed)) return moveInstantly(agent, targetPosition);
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
    lookAt(targetPosition: Vector3, speed: TKinematicSpeed): void | never {
      tempObject.position.copy(abstractTransformAgent.position$.value);
      tempObject.up.set(0, 1, 0);
      tempObject.lookAt(targetPosition);
      const targetRotation: Quaternion = tempObject.quaternion.clone().normalize();

      return agent.rotateTo(targetRotation, speed);
    },
    // Rotates agent as provided Quaternion (useful when you want to rotate as someone else already rotated)
    rotateTo(targetRotation: Quaternion, speed: TKinematicSpeed): void | never {
      if (isInstant(speed)) return rotateInstantly(agent, targetRotation);

      if (speed < 0) throw new Error('Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (agent.data.state.radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      const angularSpeed: TRadiansPerSecond = (speed / agent.data.state.radius) as TRadiansPerSecond;

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
    getAngularSpeed(): TRadiansPerSecond {
      return agent.data.state.angularSpeed;
    },
    getAngularSpeedMps(): TMetersPerSecond {
      return metersPerSecond(agent.data.state.angularSpeed * agent.data.state.radius);
    },
    setAngularSpeed(speed: TRadiansPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = speed;
    },
    setAngularSpeedMps(speed: TMetersPerSecond): void {
      if (agent.data.state.radius <= 0) throw new Error('Radius must be greater than 0 to calculate angular speed.');
      agent.setAngularSpeed((speed / agent.data.state.radius) as TRadiansPerSecond);
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
