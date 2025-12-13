import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TKinematicData } from '@/Engine/Kinematic/Models';
import type { TMetersPerSecond, TMilliseconds, TRadians } from '@/Engine/Math';
import { getAzimuthRadFromDirection, getElevationFromDirection } from '@/Engine/Math';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
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
      linearDirection: params.linearDirection ?? new Vector3(),
      angularSpeed: params.angularSpeed ?? 0,
      angularDirection: params.angularDirection ?? new Vector3()
    },
    setData({ linearSpeed, linearDirection, angularSpeed, angularDirection }: TKinematicData): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearDirection = linearDirection;
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularDirection = angularDirection;
    },
    getData(): TKinematicData {
      return agent.data;
    },
    // rotateToRad(degrees: TRadians, speed: TMetersPerSecond): void {
    //   agent.getAngularAzimuthRad(degrees);
    // },
    adjustDataByLinearVelocity(linearVelocity: TReadonlyVector3): void {
      agent.setLinearSpeed(linearVelocity.length() as TMetersPerSecond);
      agent.setLinearDirection(linearVelocity.clone().normalize());
    },
    adjustDataFromAngularVelocity(angularVelocity: TReadonlyVector3): void {
      agent.setAngularSpeed(angularVelocity.length() as TMetersPerSecond);
      agent.setAngularDirection(angularVelocity.clone().normalize());
    },
    getLinearSpeed(): TMetersPerSecond {
      return agent.data.linearSpeed;
    },
    setLinearSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearSpeed = speed;
    },
    getLinearDirection(): TReadonlyVector3 {
      return agent.data.linearDirection;
    },
    setLinearDirection(direction: TReadonlyVector3): void {
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
      const lengthXZ: number = Math.sqrt(agent.data.linearDirection.x ** 2 + agent.data.linearDirection.z ** 2) || 1;
      agent.data.linearDirection.set(Math.cos(azimuthRad) * lengthXZ, agent.data.linearDirection.y, Math.sin(azimuthRad) * lengthXZ).normalize();
    },
    getLinearElevation(): TRadians {
      return getElevationFromDirection(agent.data.linearDirection);
    },
    setLinearElevation(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(agent.data.linearDirection.z, agent.data.linearDirection.x);

      const length: number = agent.data.linearDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      agent.data.linearDirection.set(newX, newY, newZ).normalize();
    },
    getAngularSpeed(): TMetersPerSecond {
      return agent.data.angularSpeed;
    },
    setAngularSpeed(speed: TMetersPerSecond): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularSpeed = speed;
    },
    getAngularDirection(): TReadonlyVector3 {
      return agent.data.angularDirection;
    },
    setAngularDirection(direction: TReadonlyVector3): void {
      agent.data.angularDirection.copy(direction);
    },
    setAngularDirectionFromParams(azimuthRad: TRadians, elevationRad: TRadians): void {
      agent.setAngularAzimuth(azimuthRad);
      agent.setAngularElevation(elevationRad);
    },
    getAngularAzimuth(): TRadians {
      return getAzimuthRadFromDirection(agent.data.angularDirection);
    },
    setAngularAzimuth(azimuthRad: TRadians): void {
      const lengthXZ: number = Math.sqrt(agent.data.angularDirection.x ** 2 + agent.data.angularDirection.z ** 2) || 1;
      agent.data.angularDirection.set(Math.cos(azimuthRad) * lengthXZ, agent.data.angularDirection.y, Math.sin(azimuthRad) * lengthXZ);
    },
    getAngularElevation(): TRadians {
      return getElevationFromDirection(agent.data.angularDirection);
    },
    setAngularElevation(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(agent.data.angularDirection.z, agent.data.angularDirection.x);

      const length: number = agent.data.angularDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      agent.data.angularDirection.set(newX, newY, newZ).normalize();
    },
    setAngularVelocityFromParams(speed: TMetersPerSecond, azimuth: TRadians, elevation: TRadians): void {
      agent.setAngularSpeed(speed);
      agent.setAngularDirectionFromParams(azimuth, elevation);
    },
    autoUpdate$
  };

  function doKinematicMove(delta: number): void {
    if (agent.data.linearSpeed <= 0) return;

    const normalizedDirection: TReadonlyVector3 = agent.data.linearDirection.clone().normalize();
    const displacement: TReadonlyVector3 = normalizedDirection.multiplyScalar(agent.data.linearSpeed * delta);
    abstractTransformAgent.position$.next(abstractTransformAgent.position$.value.clone().add(displacement));
  }

  function doKinematicRotation(delta: number): void {
    if (agent.data.angularSpeed <= 0) return;

    const normalizedAngularDirection: TReadonlyVector3 = agent.data.angularDirection.clone().normalize();
    const angle: TRadians = (agent.data.angularSpeed * delta) as TRadians;
    const quaternion: TReadonlyQuaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
    rotationQuaternion$.next(rotationQuaternion$.value.clone().multiply(quaternion));
  }

  kinematicSub$ = combineLatest([agent.enabled$, agent.autoUpdate$])
    .pipe(
      //Do not update if agent is disabled or autoUpdate is turned off
      switchMap(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): Observable<number> => (isEnabled && isAutoUpdate ? kinematicLoopService.tick$ : EMPTY))
    )
    .subscribe((delta: number): void => {
      doKinematicRotation(delta);
      doKinematicMove(delta);
    });

  return agent;
}
