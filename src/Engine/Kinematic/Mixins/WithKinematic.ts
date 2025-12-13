import { Quaternion, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import type { TActor, TActorParams } from '@/Engine/Actor';
import type { TKinematicData, TWithKinematic } from '@/Engine/Kinematic/Models';
import type { TDegrees, TRadians } from '@/Engine/Math';
import { getAzimuthDegFromDirection, getAzimuthRadFromDirection, getElevationDegFromDirection, getElevationRadFromDirection } from '@/Engine/Math';
import type { TWriteable } from '@/Engine/Utils';

export function withKinematic(params: TActorParams): TWithKinematic {
  let _isAutoUpdate: boolean = params.kinematic?.isAutoUpdate ?? false;

  return {
    kinematic: {
      data: {
        linearSpeed: params.kinematic?.linearSpeed ?? 0,
        linearDirection: params.kinematic?.linearDirection ?? new Vector3(),
        angularSpeed: params.kinematic?.angularSpeed ?? 0,
        angularDirection: params.kinematic?.angularDirection ?? new Vector3()
      },
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
      adjustDataByLinearVelocity(linearVelocity: Vector3): void {
        this.setLinearSpeed(linearVelocity.length());
        this.setLinearDirection(linearVelocity.clone().normalize());
      },
      adjustDataFromAngularVelocity(angularVelocity: Vector3): void {
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
      getLinearDirection(): Vector3 {
        return this.data.linearDirection;
      },
      setLinearDirection(direction: Vector3): void {
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
      getAngularDirection(): Vector3 {
        return this.data.angularDirection;
      },
      setAngularDirection(direction: Vector3): void {
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
    },
    doKinematicMove(delta: number): void {
      if (this.kinematic.data.linearSpeed <= 0) return;
      const normalizedDirection: Vector3 = this.kinematic.data.linearDirection.clone().normalize();
      const displacement: Vector3 = normalizedDirection.multiplyScalar(this.kinematic.data.linearSpeed * delta);
      (this as TActor).addPosition(displacement);
    },
    doKinematicRotation(delta: number): void {
      if (this.kinematic.data.angularSpeed <= 0) return;
      const normalizedAngularDirection: Vector3 = this.kinematic.data.angularDirection.clone().normalize();
      const angle: TRadians = this.kinematic.data.angularSpeed * delta;
      const quaternion: Quaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
      (this as TActor).model.getRawModel3d().quaternion.multiplyQuaternions(quaternion, (this as TActor).model.getRawModel3d().quaternion);
    }
  };
}
