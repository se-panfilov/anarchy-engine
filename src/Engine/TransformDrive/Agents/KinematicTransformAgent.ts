import type { Subject, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TKinematicData } from '@/Engine/Kinematic/Models';
import type { TDegrees, TRadians } from '@/Engine/Math';
import { getAzimuthDegFromDirection, getAzimuthRadFromDirection, getElevationDegFromDirection, getElevationRadFromDirection } from '@/Engine/Math';
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
    adjustDataByLinearVelocity(linearVelocity: TReadonlyVector3): void {
      agent.setLinearSpeed(linearVelocity.length());
      agent.setLinearDirection(linearVelocity.clone().normalize());
    },
    adjustDataFromAngularVelocity(angularVelocity: TReadonlyVector3): void {
      agent.setAngularSpeed(angularVelocity.length());
      agent.setAngularDirection(angularVelocity.clone().normalize());
    },
    getLinearSpeed(): number {
      return agent.data.linearSpeed;
    },
    setLinearSpeed(speed: number): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.linearSpeed = speed;
    },
    getLinearDirection(): TReadonlyVector3 {
      return agent.data.linearDirection;
    },
    setLinearDirection(direction: TReadonlyVector3): void {
      agent.data.linearDirection.copy(direction);
    },
    setLinearDirectionFromParamsDeg(azimuthDeg: TDegrees, elevationDeg: TDegrees): void {
      agent.setLinearAzimuthDeg(azimuthDeg);
      agent.setLinearElevationDeg(elevationDeg);
    },
    setLinearDirectionFromParamsRad(azimuthRad: TRadians, elevationRad: TRadians): void {
      agent.setLinearAzimuthRad(azimuthRad);
      agent.setLinearElevationRad(elevationRad);
    },
    getLinearAzimuthDeg(): TDegrees {
      return getAzimuthDegFromDirection(agent.data.linearDirection);
    },
    getLinearAzimuthRad(): TRadians {
      return getAzimuthRadFromDirection(agent.data.linearDirection);
    },
    setLinearAzimuthDeg(azimuthDeg: TDegrees): void {
      const azimuthRadians: TDegrees = degToRad(azimuthDeg);
      agent.setLinearAzimuthRad(azimuthRadians);
    },
    setLinearAzimuthRad(azimuthRad: TRadians): void {
      const lengthXZ: number = Math.sqrt(agent.data.linearDirection.x ** 2 + agent.data.linearDirection.z ** 2) || 1;
      agent.data.linearDirection.set(Math.cos(azimuthRad) * lengthXZ, agent.data.linearDirection.y, Math.sin(azimuthRad) * lengthXZ).normalize();
    },
    getLinearElevationDeg(): TDegrees {
      return getElevationDegFromDirection(agent.data.linearDirection);
    },
    getLinearElevationRad(): TRadians {
      return getElevationRadFromDirection(agent.data.linearDirection);
    },
    setLinearElevationDeg(elevationDeg: TDegrees): void {
      agent.setLinearElevationRad(degToRad(elevationDeg));
    },
    setLinearElevationRad(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(agent.data.linearDirection.z, agent.data.linearDirection.x);

      const length: number = agent.data.linearDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      agent.data.linearDirection.set(newX, newY, newZ).normalize();
    },
    getAngularSpeed(): number {
      return agent.data.angularSpeed;
    },
    setAngularSpeed(speed: number): void {
      // eslint-disable-next-line functional/immutable-data
      agent.data.angularSpeed = speed;
    },
    getAngularDirection(): TReadonlyVector3 {
      return agent.data.angularDirection;
    },
    setAngularDirection(direction: TReadonlyVector3): void {
      agent.data.angularDirection.copy(direction);
    },
    setAngularDirectionFromParamsDeg(azimuthDeg: TDegrees, elevationDeg: TDegrees): void {
      agent.setAngularAzimuthDeg(azimuthDeg);
      agent.setAngularElevationDeg(elevationDeg);
    },
    setAngularDirectionFromParamsRad(azimuthRad: TRadians, elevationRad: TRadians): void {
      agent.setAngularAzimuthRad(azimuthRad);
      agent.setAngularElevationRad(elevationRad);
    },
    getAngularAzimuthDeg(): TDegrees {
      return getAzimuthDegFromDirection(agent.data.angularDirection);
    },
    getAngularAzimuthRad(): TRadians {
      return getAzimuthRadFromDirection(agent.data.angularDirection);
    },
    setAngularAzimuthDeg(azimuthDeg: TDegrees): void {
      agent.setAngularAzimuthRad(degToRad(azimuthDeg));
    },
    setAngularAzimuthRad(azimuthRad: TRadians): void {
      const lengthXZ: number = Math.sqrt(agent.data.angularDirection.x ** 2 + agent.data.angularDirection.z ** 2) || 1;
      agent.data.angularDirection.set(Math.cos(azimuthRad) * lengthXZ, agent.data.angularDirection.y, Math.sin(azimuthRad) * lengthXZ);
    },
    getAngularElevationDeg(): TDegrees {
      return getElevationDegFromDirection(agent.data.angularDirection);
    },
    getAngularElevationRad(): TRadians {
      return getElevationRadFromDirection(agent.data.angularDirection);
    },
    setAngularElevationDeg(elevationDeg: TDegrees): void {
      agent.setAngularElevationRad(degToRad(elevationDeg));
    },
    setAngularElevationRad(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(agent.data.angularDirection.z, agent.data.angularDirection.x);

      const length: number = agent.data.angularDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      agent.data.angularDirection.set(newX, newY, newZ).normalize();
    },
    setAngularVelocityFromParamsDeg(speed: number, azimuth: TDegrees, elevation: TDegrees): void {
      agent.setAngularSpeed(speed);
      agent.setAngularDirectionFromParamsDeg(azimuth, elevation);
    },
    setAngularVelocityFromParamsRad(speed: number, azimuth: TRadians, elevation: TRadians): void {
      agent.setAngularSpeed(speed);
      agent.setAngularDirectionFromParamsRad(azimuth, elevation);
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
    const angle: TRadians = agent.data.angularSpeed * delta;
    const quaternion: TReadonlyQuaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
    rotationQuaternion$.next(rotationQuaternion$.value.clone().multiply(quaternion));
  }

  kinematicSub$ = combineLatest([agent.enabled$, agent.autoUpdate$])
    .pipe(
      //Do not update if agent is disabled or autoUpdate is turned off
      filter(([isEnabled, isAutoUpdate]: ReadonlyArray<boolean>): boolean => isEnabled && isAutoUpdate),
      switchMap((): Subject<number> => kinematicLoopService.tick$)
    )
    .subscribe((delta: number): void => {
      doKinematicRotation(delta);
      doKinematicMove(delta);
    });

  return agent;
}
