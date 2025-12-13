import type { Subscription } from 'rxjs';
import { BehaviorSubject, map, takeWhile } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TKinematicData, TKinematicLoopService } from '@/Engine/Kinematic/Models';
import type { TDegrees, TRadians } from '@/Engine/Math';
import { getAzimuthDegFromDirection, getAzimuthRadFromDirection, getElevationDegFromDirection, getElevationRadFromDirection } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TKinematicTransformAgent, TKinematicTransformAgentParams } from '@/Engine/TransformDrive/Models';
import type { TWriteable } from '@/Engine/Utils';

export function KinematicTransformAgent(params: TKinematicTransformAgentParams, kinematicLoopService: TKinematicLoopService): TKinematicTransformAgent {
  let _isAutoUpdate: boolean = params.isAutoUpdate ?? false;
  let _isEnabled: boolean = _isAutoUpdate;
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(new Quaternion().setFromEuler(params.rotation));
  const rotation$: BehaviorSubject<TReadonlyEuler> = new BehaviorSubject<TReadonlyEuler>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.scale);

  const rotationQuaternionSub$: Subscription = rotationQuaternion$.pipe(map((q: TReadonlyQuaternion): TReadonlyEuler => new Euler().setFromQuaternion(q))).subscribe(rotation$);

  let kinematicSub$: Subscription | undefined = undefined;

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    //Stop subscriptions
    kinematicSub$?.unsubscribe();
    rotationQuaternionSub$?.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotationQuaternion$.complete();
    rotationQuaternion$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  const agent: Omit<TKinematicTransformAgent, 'data'> & Readonly<{ data: TWriteable<TKinematicData> }> = {
    ...destroyable,
    data: {
      linearSpeed: params.linearSpeed ?? 0,
      linearDirection: params.linearDirection ?? new Vector3(),
      angularSpeed: params.angularSpeed ?? 0,
      angularDirection: params.angularDirection ?? new Vector3()
    },
    position$: position$,
    rotation$,
    scale$: scale$,
    rotationQuaternion$,
    // TODO 8.0.0. MODELS: maybe all agents should implement this enable/disable/isEnabled (and automatically call them on agent change)?
    enable: (): boolean => (_isEnabled = true),
    disable: (): boolean => (_isEnabled = false),
    isEnabled: (): boolean => _isEnabled,
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
    isAutoUpdate(): boolean {
      return _isAutoUpdate;
    },
    setAutoUpdate(value: boolean): void {
      _isAutoUpdate = value;
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
    }
  };

  function doKinematicMove(delta: number): void {
    if (!agent.isEnabled()) return;
    if (agent.data.linearSpeed <= 0) return;
    const normalizedDirection: TReadonlyVector3 = agent.data.linearDirection.clone().normalize();
    const displacement: TReadonlyVector3 = normalizedDirection.multiplyScalar(agent.data.linearSpeed * delta);
    position$.next(position$.value.clone().add(displacement));
  }

  function doKinematicRotation(delta: number): void {
    if (!agent.isEnabled()) return;
    if (agent.data.angularSpeed <= 0) return;
    const normalizedAngularDirection: TReadonlyVector3 = agent.data.angularDirection.clone().normalize();
    const angle: TRadians = agent.data.angularSpeed * delta;
    const quaternion: TReadonlyQuaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
    rotationQuaternion$.next(rotationQuaternion$.value.clone().multiply(quaternion));
  }

  kinematicSub$ = kinematicLoopService.tick$.pipe(takeWhile((): boolean => agent.isEnabled() && agent.isAutoUpdate())).subscribe((delta: number): void => {
    doKinematicRotation(delta);
    doKinematicMove(delta);
  });

  return agent;
}
