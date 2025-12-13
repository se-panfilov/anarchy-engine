import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Euler, Object3D, Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import { metersPerSecond } from '@/Engine/Distance';
import type { TKinematicData, TKinematicWritableData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians, TRadiansPerSecond } from '@/Engine/Math';
import { getAzimuthElevationFromQuaternion, getAzimuthElevationFromVector, getAzimuthFromDirection, getElevationFromDirection } from '@/Engine/Math';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicSpeed, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { getStepRotationInfinite, getStepRotationToTarget, isInstant, isPointReached, isRotationReached, moveInstantly, rotateInstantly } from '@/Engine/TransformDrive/Utils';
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
        radius: params.state.radius ?? 0,
        angularDirection: params.state.angularDirection?.clone() ?? new Quaternion(),
        // TODO 8.0.0. MODELS: Extract forwardAxis's X and Z to constants
        // TODO 8.0.0. MODELS: the default "forwardAxis" perhaps should be "X"
        forwardAxis: params.state.forwardAxis ?? 'Z',
        isInfiniteRotation: params.state.isInfiniteRotation ?? false
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
      const { linearSpeed, linearDirection, angularSpeed, angularDirection, forwardAxis, isInfiniteRotation } = state;
      const { positionThreshold, position, rotationThreshold, rotation } = target ?? {};

      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.linearDirection.copy(linearDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
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
    getForwardAxis(): 'X' | 'Z' {
      return agent.data.state.forwardAxis;
    },
    setForwardAxis(axis: 'X' | 'Z'): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.forwardAxis = axis;
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
      if (agent.data.state.radius <= 0) throw new Error('Radius must be set and be greater than 0 to calculate angular speed.');
      const angularSpeed: TRadiansPerSecond = (speed / agent.data.state.radius) as TRadiansPerSecond;

      // eslint-disable-next-line functional/immutable-data
      agent.data.target.rotation = targetRotation.clone().normalize();
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.isInfiniteRotation = false;

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

      // TODO v1
      const { forwardAxis } = agent.data.state;
      const currentDir: Vector3 = agent.data.state.linearDirection.clone();

      const { elevation } = getAzimuthElevationFromVector(currentDir, forwardAxis);
      const totalLength: number = currentDir.length() || 1;

      let newX: number, newZ: number;
      const horizontalScale: number = Math.cos(elevation) * totalLength;

      if (forwardAxis === 'Z') {
        newX = Math.sin(azimuthRad) * horizontalScale;
        newZ = Math.cos(azimuthRad) * horizontalScale;
      } else {
        // 'X'
        newX = Math.cos(azimuthRad) * horizontalScale;
        newZ = Math.sin(azimuthRad) * horizontalScale;
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

      if (forwardAxis === 'Z') {
        newX = Math.sin(azimuth) * horizontalScale;
        newZ = Math.cos(azimuth) * horizontalScale;
      } else {
        newX = Math.cos(azimuth) * horizontalScale;
        newZ = Math.sin(azimuth) * horizontalScale;
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
    getAngularAzimuth(): TRadians {
      // TODO debug
      // return getAzimutFromQuaternionDirection(agent.data.state.angularDirection);
      return getAzimuthFromDirection(new Euler().setFromQuaternion(agent.data.state.angularDirection));
    },
    setAngularAzimuth(azimuthRad: TRadians): void {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(agent.data.target?.rotation)) agent.data.target.rotation = undefined;

      // eslint-disable-next-line functional/immutable-data
      agent.data.state.isInfiniteRotation = true;

      // approach 1
      // const currentRotation = agent.data.state.angularDirection.clone();
      // const euler = new Euler().setFromQuaternion(currentRotation, 'YXZ');
      //
      // // eslint-disable-next-line functional/immutable-data
      // euler.y = azimuthRad; // Y - azimuth (YXZ)
      // agent.data.state.angularDirection.setFromEuler(euler).normalize();

      // approach 2
      // const currentQuat = agent.data.state.angularDirection.clone();
      // const { elevation } = getAzimuthElevationFromQuaternion(currentQuat);
      // const newQuat = quaternionFromAzimuthElevation(azimuthRad, elevation);
      // // Update angularDirection and normalize to ensure a unit quaternion
      // agent.data.state.angularDirection.copy(newQuat).normalize();

      // approach 3
      // const { angularDirection, forwardAxis } = agent.data.state;
      // const euler = getEulerFromAngularDirection(angularDirection.clone(), forwardAxis);
      //
      // if (forwardAxis === 'Z') {
      //   euler.y = azimuthRad; // Y-ось для Z-ориентации
      // } else {
      //   euler.z = azimuthRad; // Z-ось для X-ориентации
      // }
      //
      // agent.data.state.angularDirection.setFromEuler(euler).normalize();

      //approach 4
      // const { angularDirection, forwardAxis } = agent.data.state;
      //
      // // Convert to Euler angles with proper order
      // const euler = new Euler().setFromQuaternion(angularDirection, 'YXZ');
      //
      // // Modify azimuth based on forward axis
      // if (forwardAxis === 'Z') {
      //   euler.y = azimuthRad; // Rotate around Y axis for Z-forward
      // } else {
      //   euler.z = azimuthRad; // Rotate around Z axis for X-forward
      // }
      //
      // // Update quaternion and normalize
      // agent.data.state.angularDirection.setFromEuler(euler).normalize();

      // approach 5
      const currentQuat = agent.data.state.angularDirection.clone();
      const { azimuth, elevation } = getAzimuthElevationFromQuaternion(currentQuat);

      let deltaAzimuth = azimuthRad - azimuth;
      deltaAzimuth = ((deltaAzimuth + Math.PI) % (2 * Math.PI)) - Math.PI;
      const newAzimuth = azimuth + deltaAzimuth;
      const newQuat = quaternionFromAzimuthElevation(newAzimuth, elevation);
      agent.data.state.angularDirection.copy(newQuat).normalize();
    },
    getAngularElevation(): TRadians {
      // TODO debug
      // return getElevationFromQuaternionDirection(agent.data.state.angularDirection);
      return getElevationFromDirection(agent.data.state.angularDirection);
    },
    setAngularElevation(elevationRad: TRadians): void {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(agent.data.target?.rotation)) agent.data.target.rotation = undefined;
      // eslint-disable-next-line functional/immutable-data
      agent.data.state.isInfiniteRotation = true;

      //v1
      // const currentRotation = agent.data.state.angularDirection.clone();
      //
      // const euler = new Euler().setFromQuaternion(currentRotation, 'YXZ');
      //
      // euler.x = elevationRad;

      // agent.data.state.angularDirection.setFromEuler(euler).normalize();

      // v2
      // const azimuth: TRadians = agent.getAngularAzimuth();
      // const quaternion: Quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuth, 0, 'ZYX'));
      // agent.data.state.angularDirection.copy(quaternion);
      // // This approach could lead to bugs, if the quaternion is not normalized
      // // const azimuth: TRadians = agent.getAngularAzimuth();
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

      // v3
      const { angularDirection } = agent.data.state;

      // Convert to Euler angles with fixed order
      const euler = new Euler().setFromQuaternion(angularDirection, 'YXZ');

      // Modify elevation (X axis for vertical)
      // eslint-disable-next-line functional/immutable-data
      euler.x = elevationRad;

      // Update quaternion and normalize
      agent.data.state.angularDirection.setFromEuler(euler).normalize();
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

    const rotationStep: TRadians = (agent.data.state.angularSpeed * delta) as TRadians;

    let stepRotation: Quaternion | undefined;
    if (agent.data.state.isInfiniteRotation) {
      stepRotation = getStepRotationInfinite(agent, rotationStep);
    } else {
      if (isRotationReached(agent.data.target, agent.rotation$.value, agent.data.state)) return;
      stepRotation = getStepRotationToTarget(agent, rotationStep);
    }
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

// TODO 8.0.0. MODELS: Extract or reove
function quaternionFromAzimuthElevation(azimuth: TRadians, elevation: TRadians): Quaternion {
  const euler = new Euler(elevation, azimuth, 0, 'YXZ');
  return new Quaternion().setFromEuler(euler);
}
