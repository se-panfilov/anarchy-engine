import type { Subscription } from 'rxjs';
import { BehaviorSubject, map, takeWhile } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TActorParams } from '@/Engine/Actor';
import type { TKinematicActorDriver, TKinematicData, TKinematicLoopService } from '@/Engine/Kinematic/Models';
import type { TDegrees, TRadians } from '@/Engine/Math';
import { getAzimuthDegFromDirection, getAzimuthRadFromDirection, getElevationDegFromDirection, getElevationRadFromDirection } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';

export function KinematicActorDriver(params: TActorParams, kinematicLoopService: TKinematicLoopService): TKinematicActorDriver {
  let _isAutoUpdate: boolean = params.kinematic?.isAutoUpdate ?? false;
  let _isEnabled: boolean = _isAutoUpdate;
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotationQuaternion$: BehaviorSubject<TReadonlyQuaternion> = new BehaviorSubject<TReadonlyQuaternion>(new Quaternion().setFromEuler(params.rotation));
  const rotation$: BehaviorSubject<TReadonlyEuler> = new BehaviorSubject<TReadonlyEuler>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3 | undefined> = new BehaviorSubject<TReadonlyVector3 | undefined>(params.scale);

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

  // TODO 8.0.0. MODELS: Could we replace "this" with "driver"?
  // TODO 8.0.0. MODELS: remove degrees sheet, keep ony radians
  const driver = {
    ...destroyable,
    data: {
      linearSpeed: params.kinematic?.linearSpeed ?? 0,
      linearDirection: params.kinematic?.linearDirection ?? new Vector3(),
      angularSpeed: params.kinematic?.angularSpeed ?? 0,
      angularDirection: params.kinematic?.angularDirection ?? new Vector3()
    },
    position$: position$,
    rotation$,
    scale$: scale$,
    rotationQuaternion$,
    runDriver: (): boolean => (_isEnabled = true),
    stopDriver: (): boolean => (_isEnabled = false),
    isEnabled: (): boolean => _isEnabled,
    setData({ linearSpeed, linearDirection, angularSpeed, angularDirection }: TKinematicData): void {
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).linearSpeed = linearSpeed;
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).linearDirection = linearDirection;
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).angularSpeed = angularSpeed;
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).angularDirection = angularDirection;
    },
    getData(): TKinematicData {
      return this.data;
    },
    adjustDataByLinearVelocity(linearVelocity: TReadonlyVector3): void {
      this.setLinearSpeed(linearVelocity.length());
      this.setLinearDirection(linearVelocity.clone().normalize());
    },
    adjustDataFromAngularVelocity(angularVelocity: TReadonlyVector3): void {
      this.setAngularSpeed(angularVelocity.length());
      this.setAngularDirection(angularVelocity.clone().normalize());
    },
    isAutoUpdate(): boolean {
      return _isAutoUpdate;
    },
    setAutoUpdate(value: boolean): void {
      _isAutoUpdate = value;
    },
    getLinearSpeed(): number {
      return this.data.linearSpeed;
    },
    setLinearSpeed(speed: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).linearSpeed = speed;
    },
    getLinearDirection(): TReadonlyVector3 {
      return this.data.linearDirection;
    },
    setLinearDirection(direction: TReadonlyVector3): void {
      this.data.linearDirection.copy(direction);
    },
    setLinearDirectionFromParamsDeg(azimuthDeg: TDegrees, elevationDeg: TDegrees): void {
      this.setLinearAzimuthDeg(azimuthDeg);
      this.setLinearElevationDeg(elevationDeg);
    },
    setLinearDirectionFromParamsRad(azimuthRad: TRadians, elevationRad: TRadians): void {
      this.setLinearAzimuthRad(azimuthRad);
      this.setLinearElevationRad(elevationRad);
    },
    getLinearAzimuthDeg(): TDegrees {
      return getAzimuthDegFromDirection(this.data.linearDirection);
    },
    getLinearAzimuthRad(): TRadians {
      return getAzimuthRadFromDirection(this.data.linearDirection);
    },
    setLinearAzimuthDeg(azimuthDeg: TDegrees): void {
      const azimuthRadians: TDegrees = degToRad(azimuthDeg);
      this.setLinearAzimuthRad(azimuthRadians);
    },
    setLinearAzimuthRad(azimuthRad: TRadians): void {
      const lengthXZ: number = Math.sqrt(this.data.linearDirection.x ** 2 + this.data.linearDirection.z ** 2) || 1;
      this.data.linearDirection.set(Math.cos(azimuthRad) * lengthXZ, this.data.linearDirection.y, Math.sin(azimuthRad) * lengthXZ).normalize();
    },
    getLinearElevationDeg(): TDegrees {
      return getElevationDegFromDirection(this.data.linearDirection);
    },
    getLinearElevationRad(): TRadians {
      return getElevationRadFromDirection(this.data.linearDirection);
    },
    setLinearElevationDeg(elevationDeg: TDegrees): void {
      this.setLinearElevationRad(degToRad(elevationDeg));
    },
    setLinearElevationRad(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(this.data.linearDirection.z, this.data.linearDirection.x);

      const length: number = this.data.linearDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      this.data.linearDirection.set(newX, newY, newZ).normalize();
    },
    getAngularSpeed(): number {
      return this.data.angularSpeed;
    },
    setAngularSpeed(speed: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.data as TWriteable<TKinematicData>).angularSpeed = speed;
    },
    getAngularDirection(): TReadonlyVector3 {
      return this.data.angularDirection;
    },
    setAngularDirection(direction: TReadonlyVector3): void {
      this.data.angularDirection.copy(direction);
    },
    setAngularDirectionFromParamsDeg(azimuthDeg: TDegrees, elevationDeg: TDegrees): void {
      this.setAngularAzimuthDeg(azimuthDeg);
      this.setAngularElevationDeg(elevationDeg);
    },
    setAngularDirectionFromParamsRad(azimuthRad: TRadians, elevationRad: TRadians): void {
      this.setAngularAzimuthRad(azimuthRad);
      this.setAngularElevationRad(elevationRad);
    },
    getAngularAzimuthDeg(): TDegrees {
      return getAzimuthDegFromDirection(this.data.angularDirection);
    },
    getAngularAzimuthRad(): TRadians {
      return getAzimuthRadFromDirection(this.data.angularDirection);
    },
    setAngularAzimuthDeg(azimuthDeg: TDegrees): void {
      this.setAngularAzimuthRad(degToRad(azimuthDeg));
    },
    setAngularAzimuthRad(azimuthRad: TRadians): void {
      const lengthXZ: number = Math.sqrt(this.data.angularDirection.x ** 2 + this.data.angularDirection.z ** 2) || 1;
      this.data.angularDirection.set(Math.cos(azimuthRad) * lengthXZ, this.data.angularDirection.y, Math.sin(azimuthRad) * lengthXZ);
    },
    getAngularElevationDeg(): TDegrees {
      return getElevationDegFromDirection(this.data.angularDirection);
    },
    getAngularElevationRad(): TRadians {
      return getElevationRadFromDirection(this.data.angularDirection);
    },
    setAngularElevationDeg(elevationDeg: TDegrees): void {
      this.setAngularElevationRad(degToRad(elevationDeg));
    },
    setAngularElevationRad(elevationRad: TRadians): void {
      const currentAzimuth: number = Math.atan2(this.data.angularDirection.z, this.data.angularDirection.x);

      const length: number = this.data.angularDirection.length();
      const newY: number = Math.sin(elevationRad) * length;
      const newLengthXZ: number = Math.cos(elevationRad) * length;

      const newX: number = Math.cos(currentAzimuth) * newLengthXZ;
      const newZ: number = Math.sin(currentAzimuth) * newLengthXZ;

      this.data.angularDirection.set(newX, newY, newZ).normalize();
    },
    setAngularVelocityFromParamsDeg(speed: number, azimuth: TDegrees, elevation: TDegrees): void {
      this.setAngularSpeed(speed);
      this.setAngularDirectionFromParamsDeg(azimuth, elevation);
    },
    setAngularVelocityFromParamsRad(speed: number, azimuth: TRadians, elevation: TRadians): void {
      this.setAngularSpeed(speed);
      this.setAngularDirectionFromParamsRad(azimuth, elevation);
    }
  };

  function doKinematicMove(delta: number): void {
    if (!driver.isEnabled()) return;
    if (driver.data.linearSpeed <= 0) return;
    const normalizedDirection: TReadonlyVector3 = driver.data.linearDirection.clone().normalize();
    const displacement: TReadonlyVector3 = normalizedDirection.multiplyScalar(driver.data.linearSpeed * delta);
    position$.next(position$.value.clone().add(displacement));
  }

  function doKinematicRotation(delta: number): void {
    if (!driver.isEnabled()) return;
    if (driver.data.angularSpeed <= 0) return;
    const normalizedAngularDirection: TReadonlyVector3 = driver.data.angularDirection.clone().normalize();
    const angle: TRadians = driver.data.angularSpeed * delta;
    const quaternion: TReadonlyQuaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
    rotationQuaternion$.next(rotationQuaternion$.value.clone().multiply(quaternion));
  }

  kinematicSub$ = kinematicLoopService.tick$.pipe(takeWhile((): boolean => driver.isEnabled() && driver.isAutoUpdate())).subscribe((delta: number): void => {
    doKinematicMove(delta);
    doKinematicRotation(delta);
  });

  return driver;
}
