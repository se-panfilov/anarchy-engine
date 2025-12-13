import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import type { QuaternionLike } from 'three';
import { Euler, Quaternion, Vector3 } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TKinematicData } from '@/Engine/Kinematic/Models';
import type { TMeters, TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine/Math';
import { getAzimutFromQuaternionDirection, getAzimuthRadFromDirection, getElevationFromDirection, getElevationFromQuaternionDirection } from '@/Engine/Math';
import type { TReadonlyEuler, TReadonlyQuaternion } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TKinematicAgentDependencies, TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import type { TWriteable } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, { kinematicLoopService }: TKinematicAgentDependencies): TKinematicTransformAgent {
  const autoUpdate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(params.isAutoUpdate ?? false);
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Kinematic);

  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(new Quaternion().setFromEuler(params.rotation));
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

  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TWriteable<TKinematicData> }> = {
    ...abstractTransformAgent,
    rotationQuaternion$,
    data: {
      linearSpeed: params.linearSpeed ?? 0,
      linearDirection: params.linearDirection?.clone() ?? new Vector3(),
      angularSpeed: params.angularSpeed ?? 0,
      angularDirection: params.angularDirection?.clone() ?? new Quaternion()
    },
    setData({ linearSpeed, linearDirection, angularSpeed, angularDirection }: TKinematicData): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearDirection.copy(linearDirection);
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularDirection.copy(angularDirection);
    },
    getData(): TKinematicData {
      return agent.data;
    },
    // TODO CWP
    // TODO 8.0.0. MODELS: Refactor this code. It's working, but it's a mess atm.
    moveTo(targetPosition: Vector3, speed: TMetersPerSecond): void {
      const epsilon = 0.01;

      // If the agent is already at the target, do not move
      if (targetPosition.equals(abstractTransformAgent.position$.value)) {
        agent.setLinearSpeed(0);
        return;
      }

      const direction: Vector3 = new Vector3();
      const vectorToTarget = new Vector3();

      direction.copy(targetPosition).sub(abstractTransformAgent.position$.value).normalize();
      agent.setLinearDirection(direction);
      agent.setLinearSpeed(speed);

      const subscription = kinematicLoopService.tick$.subscribe((deltaTime: TMilliseconds) => {
        // If the agent is already at the target, do not move
        if (agent.getLinearSpeed() === 0) {
          subscription.unsubscribe();
          return;
        }

        const currentPosition = abstractTransformAgent.position$.value;
        vectorToTarget.copy(targetPosition).sub(currentPosition);

        const distanceSquared = vectorToTarget.lengthSq();

        // If the agent is close enough to the target, stop the agent
        if (distanceSquared < epsilon * epsilon) {
          agent.setLinearSpeed(0);
          subscription.unsubscribe();
          return;
        }

        const dotProduct = vectorToTarget.dot(agent.getLinearDirection());
        // If the agent has passed the target, stop the agent
        if (dotProduct < 0) {
          agent.setLinearSpeed(0);
          subscription.unsubscribe();
          return;
        }

        const displacement = agent
          .getLinearDirection()
          .clone()
          .multiplyScalar(speed * deltaTime);
        const newPosition = currentPosition.clone().add(displacement);

        // If the agent has crossed the target (e.g. in a single frame), stop the agent
        const crossedTarget = vectorToTarget.dot(direction) < 0;
        if (crossedTarget) {
          agent.setLinearSpeed(0);
          subscription.unsubscribe();
          return;
        }

        // Update the agent's position
        abstractTransformAgent.position$.next(newPosition);
      });
    },
    // TODO 8.0.0. MODELS: Refactor this code. It's working, but it's a mess atm.
    rotateTo(targetRotation: Quaternion, speed: TMetersPerSecond, radius: TMeters): void {
      const epsilon = 0.01;

      if (radius <= 0) {
        console.warn('Radius must be greater than 0 to calculate angular speed.');
        return;
      }

      const angularSpeed: TMetersPerSecond = (speed / radius) as TMetersPerSecond;

      // If the speed is 0, do nothing
      if (angularSpeed === 0) {
        agent.setAngularSpeed(0);
        return;
      }

      const currentRotation: Quaternion = rotationQuaternion$.value.clone();

      // Calculate angle to the target using dot product
      const dot = currentRotation.dot(targetRotation);
      let angleToTarget = Math.acos(2 * dot * dot - 1);

      if (angleToTarget < epsilon) {
        agent.setAngularSpeed(0);
        return;
      }

      agent.setAngularDirection(targetRotation);
      agent.setAngularSpeed(angularSpeed);

      const subscription = kinematicLoopService.tick$.subscribe((deltaTime: TMilliseconds) => {
        // If the speed is 0, do nothing
        if (agent.getAngularSpeed() === 0) {
          subscription.unsubscribe();
          return;
        }

        const currentRotation = rotationQuaternion$.value.clone();

        // Recalculate angle to target
        const dot = currentRotation.dot(targetRotation);
        angleToTarget = Math.acos(2 * dot * dot - 1);

        // If the agent is close enough to the target, stop the agent
        if (angleToTarget < epsilon) {
          agent.setAngularSpeed(0);
          subscription.unsubscribe();
          return;
        }

        const rotationStep = angularSpeed * deltaTime;
        const stepRotation = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), rotationStep);
        const newRotation = currentRotation.clone().multiply(stepRotation).normalize();

        // Recalculate angle after applying step rotation
        const newDot = newRotation.dot(targetRotation);
        const angleAfterStep = Math.acos(2 * newDot * newDot - 1);

        // If the agent has passed the target, stop the agent
        if (angleAfterStep > angleToTarget) {
          agent.setAngularSpeed(0);
          subscription.unsubscribe();
          return;
        }

        rotationQuaternion$.next(newRotation);
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
      return agent.data.linearSpeed;
    },
    setLinearSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearSpeed = speed;
    },
    getLinearDirection(): Vector3 {
      return agent.data.linearDirection;
    },
    setLinearDirection(direction: Vector3Like): void {
      agent.data.linearDirection.copy(direction);
    },
    setLinearDirectionFromParams(azimuthRad: TRadians, elevationRad: TRadians): void {
      agent.setLinearAzimuth(azimuthRad);
      agent.setLinearElevation(elevationRad);
    },
    getLinearAzimuth(): TRadians {
      return getAzimuthRadFromDirection(agent.data.linearDirection);
    },
    setLinearAzimuth(azimuthRad: TRadians): void {
      const elevation = agent.getLinearElevation();
      const quaternion = new Quaternion().setFromEuler(new Euler(elevation, azimuthRad, 0, 'ZYX'));
      agent.setLinearDirection(quaternion);
    },
    getLinearElevation(): TRadians {
      return getElevationFromDirection(agent.data.linearDirection);
    },
    setLinearElevation(elevationRad: TRadians): void {
      const azimuth = this.getLinearAzimuth(); // Get current azimuth
      const quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuth, 0, 'ZYX'));
      agent.setLinearDirection(quaternion);
    },
    getAngularSpeed(): TMetersPerSecond {
      return agent.data.angularSpeed;
    },
    setAngularSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularSpeed = speed;
    },
    getAngularDirection(): Quaternion {
      return agent.data.angularDirection.clone();
    },
    setAngularDirection(direction: QuaternionLike): void {
      agent.data.angularDirection.copy(direction);
    },
    setAngularDirectionFromParams(azimuthRad: TRadians, elevationRad: TRadians): void {
      const quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuthRad, 0, 'ZYX')); // Convert azimuth and elevation to Quaternion
      agent.setAngularDirection(quaternion);
    },
    getAngularAzimuth(): TRadians {
      return getAzimutFromQuaternionDirection(agent.data.angularDirection);
    },
    setAngularAzimuth(azimuthRad: TRadians): void {
      const elevation = agent.getAngularElevation();
      const quaternion = new Quaternion().setFromEuler(new Euler(elevation, azimuthRad, 0, 'ZYX'));
      agent.data.angularDirection.copy(quaternion);
    },
    getAngularElevation(): TRadians {
      return getElevationFromQuaternionDirection(agent.data.angularDirection);
    },
    setAngularElevation(elevationRad: TRadians): void {
      const azimuth: TRadians = agent.getAngularAzimuth();
      const quaternion: Quaternion = new Quaternion().setFromEuler(new Euler(elevationRad, azimuth, 0, 'ZYX'));
      agent.data.angularDirection.copy(quaternion);

      // This approach could lead to bugs, if the quaternion is not normalized
      // const azimuth: TRadians = agent.getAngularAzimuth();
      //
      // const sinElevation: TRadians = Math.sin(elevationRad) as TRadians;
      // const cosElevation: TRadians = Math.cos(elevationRad) as TRadians;
      //
      // const sinAzimuth: TRadians = Math.sin(azimuth) as TRadians;
      // const cosAzimuth: TRadians = Math.cos(azimuth) as TRadians;
      //
      // agent.data.angularDirection
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
    if (agent.data.linearSpeed <= 0) return;

    linearDirection.copy(agent.data.linearDirection).normalize();
    displacement.copy(linearDirection).multiplyScalar(agent.data.linearSpeed * delta);

    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  function doKinematicRotation(delta: TMilliseconds): void {
    if (agent.data.angularSpeed <= 0) return;

    const angle: TRadians = (agent.data.angularSpeed * delta) as TRadians;
    const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angle);
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
