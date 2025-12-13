import { metersPerSecond } from '@Anarchy/Engine/Distance';
import { DefaultIsAutoUpdate, DefaultKinematicState, DefaultKinematicTarget, kinematicToConfig } from '@Anarchy/Engine/Kinematic';
import { ForwardAxis } from '@Anarchy/Engine/Kinematic/Constants';
import type { TKinematicConfig, TKinematicData, TKinematicWritableData } from '@Anarchy/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians, TRadiansPerSecond } from '@Anarchy/Engine/Math';
import { getAzimuthElevationFromVector, getElevationFromDirection } from '@Anarchy/Engine/Math';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicSpeed, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@Anarchy/Engine/TransformDrive/Models';
import { getStepRotation, isInstant, isPointReached, isRotationReached, moveInstantly, rotateInstantly } from '@Anarchy/Engine/TransformDrive/Utils/KinematicAgentUtils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike, Vector3Like } from 'three';
import { Object3D, Quaternion, Vector3 } from 'three';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoop }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? DefaultIsAutoUpdate);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  let kinematicSub$: Subscription | undefined = undefined;

  let tempObject: Object3D = new Object3D();
  let linearDirection: Vector3 = new Vector3();
  let displacement: Vector3 = new Vector3();

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    kinematicSub$?.unsubscribe();

    abstractTransformAgent.destroy$.next();

    tempObject.parent?.remove(tempObject);
    tempObject = null as any;
    linearDirection = null as any;
    displacement = null as any;
  });

  // eslint-disable-next-line functional/immutable-data
  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TKinematicWritableData }> = Object.assign(abstractTransformAgent, {
    data: {
      state: {
        linearSpeed: params.state.linearSpeed ?? DefaultKinematicState.linearSpeed,
        linearDirection: params.state.linearDirection?.clone() ?? DefaultKinematicState.linearDirection,
        angularSpeed: params.state.angularSpeed ?? DefaultKinematicState.angularSpeed,
        radius: params.state.radius ?? DefaultKinematicState.radius,
        angularDirection: params.state.angularDirection?.clone() ?? DefaultKinematicState.angularDirection,
        forwardAxis: params.state.forwardAxis ?? DefaultKinematicState.forwardAxis,
        isInfiniteRotation: params.state.isInfiniteRotation ?? DefaultKinematicState.isInfiniteRotation
      },
      target: {
        positionThreshold: params.target?.positionThreshold ?? DefaultKinematicTarget.positionThreshold,
        position: params.target?.position?.clone() ?? DefaultKinematicTarget.position,
        rotationThreshold: params.target?.rotationThreshold ?? DefaultKinematicTarget.rotationThreshold,
        rotation: params.target?.rotation?.clone() ?? DefaultKinematicTarget.rotation
      }
    },
    setData({ state, target }: TKinematicData): void {
      const { linearSpeed, linearDirection, angularSpeed, angularDirection, forwardAxis, isInfiniteRotation } = state;
      const { positionThreshold, position, rotationThreshold, rotation } = target ?? {};

      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = linearSpeed;

      agent.data.state.linearDirection.copy(linearDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = angularSpeed;

      agent.data.state.angularDirection.copy(angularDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.forwardAxis = forwardAxis;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.isInfiniteRotation = isInfiniteRotation;

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
    getForwardAxis(): ForwardAxis {
      return agent.data.state.forwardAxis;
    },
    setForwardAxis(axis: ForwardAxis): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.forwardAxis = axis;
    },
    moveTo(targetPosition: TReadonlyVector3, speed: TKinematicSpeed): void | never {
      if (isInstant(speed)) return moveInstantly(agent, targetPosition);
      if (speed < 0) throw new Error('[KinematicTransformAgent]: Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setLinearSpeed(0);

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.position = targetPosition.clone();

      // If the agent is already at the target, do not move
      if (targetPosition.equals(abstractTransformAgent.position$.value)) return agent.setLinearSpeed(0);

      agent.setLinearDirection(targetPosition.clone().sub(abstractTransformAgent.position$.value).normalize());
      agent.setLinearSpeed(speed);
      return undefined;
    },
    // Rotates agent to "look" at the target position (e.g., mouse click position or any other actor, etc.)
    lookAt(targetPosition: TReadonlyVector3, speed: TKinematicSpeed): void | never {
      tempObject.position.copy(abstractTransformAgent.position$.value);
      tempObject.up.set(0, 1, 0);
      tempObject.lookAt(targetPosition as Vector3);
      const targetRotation: Quaternion = tempObject.quaternion.clone().normalize();

      return agent.rotateTo(targetRotation, speed);
    },
    // Rotates agent as provided Quaternion (useful when you want to rotate as someone else already rotated)
    rotateTo(targetRotation: TReadonlyQuaternion, speed: TKinematicSpeed, infinite: boolean = false): void | never {
      if (isInstant(speed)) return rotateInstantly(agent, targetRotation);

      if (speed < 0) throw new Error('[KinematicTransformAgent]: Speed must be greater than 0 to calculate angular speed.');
      if (speed === 0) return agent.setAngularSpeed(0);
      if (agent.data.state.radius === 0) throw new Error('[KinematicTransformAgent]: Radius must be greater than 0 to calculate angular speed.');
      const angularSpeed: TRadiansPerSecond = (speed / agent.data.state.radius) as TRadiansPerSecond;

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = targetRotation.clone().normalize();
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.isInfiniteRotation = infinite;

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
    getLinearAzimuth(): TRadians {
      return getAzimuthElevationFromVector(agent.data.state.linearDirection, agent.data.state.forwardAxis).azimuth;
    },
    setLinearAzimuth(azimuthRad: TRadians): void {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(agent.data.target?.position)) agent.data.target.position = undefined;

      const { forwardAxis } = agent.data.state;
      const currentDir: Vector3 = agent.data.state.linearDirection.clone();

      const { elevation } = getAzimuthElevationFromVector(currentDir, forwardAxis);
      const totalLength: number = currentDir.length() || 1;

      let newX: number, newZ: number;
      const horizontalScale: number = Math.cos(elevation) * totalLength;

      if (forwardAxis === ForwardAxis.Z) {
        newX = Math.sin(azimuthRad) * horizontalScale;
        newZ = Math.cos(azimuthRad) * horizontalScale;
      } else if (forwardAxis === ForwardAxis.X) {
        newX = Math.cos(azimuthRad) * horizontalScale;
        newZ = Math.sin(azimuthRad) * horizontalScale;
      } else {
        throw new Error(`[KinematicTransformAgent]: Unknown forward axis: must be either ${ForwardAxis.Z} or ${ForwardAxis.X}`);
      }

      const newY = Math.sin(elevation) * totalLength;
      agent.data.state.linearDirection.set(newX, newY, newZ).normalize();

      // An alternative approach (better calculations with edge cases). Uses vector projection instead of trigonometry (If chose this approach, makes sense to make setLinearAzimuth using the same approach)
      // const current = agent.data.state.linearDirection;
      // const currentY = current.y;
      // const horizontalMag = Math.sqrt(current.x * current.x + current.z * current.z);
      // let newX: number, newZ: number;
      // if (agent.data.state.forwardAxis === 'Z') {
      //   newX = Math.sin(azimuthRad) * horizontalMag;
      //   newZ = Math.cos(azimuthRad) * horizontalMag;
      // } else {
      //   // forwardAxis === 'X'
      //   newX = Math.cos(azimuthRad) * horizontalMag;
      //   newZ = Math.sin(azimuthRad) * horizontalMag;
      // }
      // agent.data.state.linearDirection.set(newX, currentY, newZ);
      // // agent.data.state.linearDirection.normalize();
    },
    getLinearElevation(): TRadians {
      return getElevationFromDirection(agent.data.state.linearDirection);
    },
    setLinearElevation(elevationRad: TRadians): void {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(agent.data.target?.position)) agent.data.target.position = undefined;

      const { forwardAxis } = agent.data.state;
      const currentDir = agent.data.state.linearDirection.clone();

      const { azimuth } = getAzimuthElevationFromVector(currentDir, forwardAxis);
      const totalLength: number = currentDir.length() || 1;

      const horizontalScale: number = Math.cos(elevationRad) * totalLength;
      let newX: number, newZ: number;

      if (forwardAxis === ForwardAxis.Z) {
        newX = Math.sin(azimuth) * horizontalScale;
        newZ = Math.cos(azimuth) * horizontalScale;
      } else if (ForwardAxis.X) {
        newX = Math.cos(azimuth) * horizontalScale;
        newZ = Math.sin(azimuth) * horizontalScale;
      } else {
        throw new Error(`[KinematicTransformAgent]: Unknown forward axis: must be either ${ForwardAxis.Z} or ${ForwardAxis.X}`);
      }

      const newY = Math.sin(elevationRad) * totalLength;

      agent.data.state.linearDirection.set(newX, newY, newZ).normalize();

      // An alternative approach (better calculations with edge cases). Uses vector projection instead of trigonometry (If chose this approach, makes sense to make setLinearAzimuth using the same approach)
      // const current = agent.data.state.linearDirection;
      // const horizontal = new Vector3(current.x, 0, current.z);
      // const h = horizontal.length();
      //
      // let horizontalDir: Vector3;
      // if (h > 1e-6) {
      //   horizontalDir = horizontal.clone().normalize();
      // } else {
      //   horizontalDir = agent.data.state.forwardAxis === 'Z' ? new Vector3(0, 0, 1) : new Vector3(1, 0, 0);
      // }
      //
      // // Approach 1 (absolute): Set the vector as in spherical coordinates with the given elevation.
      // // horizontal component will be cos(elevation), and vertical sin(elevation).
      // const newHorizontalMag = Math.cos(elevationRad);
      // const newHorizontal = horizontalDir.multiplyScalar(newHorizontalMag);
      // const newY = Math.sin(elevationRad);
      // agent.data.state.linearDirection.set(newHorizontal.x, newY, newHorizontal.z);
      //
      // // Approach 2 (additive): If you want to "add" vertical movement
      // // const newY = current.y + Math.tan(elevationRad) * h;
      // // agent.data.state.linearDirection.set(current.x, newY, current.z);
      // // agent.data.state.linearDirection.normalize();
    },
    resetLinear(resetSpeed: boolean, resetDirection: boolean): void {
      if (resetSpeed) agent.setLinearSpeed(0);
      if (resetDirection) agent.setLinearDirection(new Vector3());
    },
    getAngularSpeed(): TRadiansPerSecond {
      return agent.data.state.angularSpeed;
    },
    getAngularSpeedMps(): TMetersPerSecond | never {
      if (agent.data.state.radius <= 0) throw new Error('Radius must be set and be greater than 0 to calculate angular speed.');
      return metersPerSecond(agent.data.state.angularSpeed * agent.data.state.radius);
    },
    setAngularSpeed(speed: TRadiansPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = speed;
    },
    setAngularSpeedMps(speed: TMetersPerSecond): void | never {
      if (agent.data.state.radius <= 0) throw new Error('Radius must be set and be greater than 0 to calculate angular speed.');
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
    serialize(): TKinematicConfig {
      return kinematicToConfig(agent);
    },
    autoUpdate$
  });

  function doKinematicMove(delta: TMilliseconds): void {
    if (agent.data.state.linearSpeed <= 0) return;

    if (isPointReached(agent.data.target, abstractTransformAgent.position$.value, agent.data.state)) return;

    const safeDelta: TMilliseconds = delta > 0 ? delta : (1 as TMilliseconds);
    linearDirection.copy(agent.data.state.linearDirection).normalize();
    displacement.copy(linearDirection).multiplyScalar(agent.data.state.linearSpeed * safeDelta);

    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  function doKinematicRotation(delta: TMilliseconds): void {
    if (agent.data.state.angularSpeed <= 0) return;

    const safeDelta: TMilliseconds = delta > 0 ? delta : (1 as TMilliseconds);
    const rotationStep: TRadians = (agent.data.state.angularSpeed * safeDelta) as TRadians;

    if (!agent.data.state.isInfiniteRotation && isRotationReached(agent.data.target, agent.rotation$.value, agent.data.state)) return;
    const stepRotation: Quaternion | undefined = getStepRotation(agent, rotationStep, agent.data.state.isInfiniteRotation);

    if (isNotDefined(stepRotation)) return;

    agent.data.state.angularDirection.multiply(stepRotation).normalize();
    agent.rotation$.next(agent.data.state.angularDirection);
  }

  kinematicSub$ = combineLatest([agent.enabled$, agent.autoUpdate$])
    .pipe(
      //Do not update if agent is disabled or autoUpdate is turned off
      switchMap(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): Observable<TMilliseconds> => (isEnabled && isAutoUpdate ? kinematicLoop.tick$ : EMPTY))
    )
    .subscribe((delta: TMilliseconds): void => {
      doKinematicRotation(delta);
      doKinematicMove(delta);
    });

  return agent;
}
