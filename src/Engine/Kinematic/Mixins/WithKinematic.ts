import { MathUtils, Quaternion, Vector3 } from 'three';

import type { TActorParams, TActorWrapperAsync } from '@/Engine/Actor';
import type { TKinematicData, TWithKinematic } from '@/Engine/Kinematic/Models';
import { getAzimuthFromDirection, getElevationFromDirection } from '@/Engine/Math';
import type { TWriteable } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withKinematic(params: TActorParams): TWithKinematic {
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
        this.setLinearDirection(linearVelocity.normalize());
      },
      adjustDataFromAngularVelocity(angularVelocity: Vector3): void {
        this.setAngularSpeed(angularVelocity.length());
        this.setAngularDirection(angularVelocity.normalize());
      },
      isAutoUpdate: params.isKinematicAutoUpdate ?? false,
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
      setLinearDirectionFromParams(azimuth: number, elevation: number): void {
        this.setLinearAzimuth(azimuth);
        this.setLinearElevation(elevation);
      },
      getLinearAzimuth(): number {
        return getAzimuthFromDirection(this.data.linearDirection);
      },
      setLinearAzimuth(azimuth: number): void {
        const azimuthRadians: number = MathUtils.degToRad(azimuth);
        this.data.linearDirection.set(Math.cos(azimuthRadians), this.data.linearDirection.y, Math.sin(azimuthRadians));
      },
      getLinearElevation(): number {
        return getElevationFromDirection(this.data.linearDirection);
      },
      setLinearElevation(elevation: number): void {
        const elevationRadians: number = MathUtils.degToRad(elevation);
        const currentAzimuth: number = Math.atan2(this.data.linearDirection.z, this.data.linearDirection.x);

        const newX: number = Math.cos(currentAzimuth) * Math.cos(elevationRadians);
        const newY: number = Math.sin(elevationRadians);
        const newZ: number = Math.sin(currentAzimuth) * Math.cos(elevationRadians);

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
      setAngularDirectionFromParams(azimuth: number, elevation: number): void {
        this.setAngularAzimuth(azimuth);
        this.setAngularElevation(elevation);
      },
      getAngularAzimuth(): number {
        return getAzimuthFromDirection(this.data.angularDirection);
      },
      setAngularAzimuth(azimuth: number): void {
        const azimuthRadians: number = MathUtils.degToRad(azimuth);
        this.data.angularDirection.set(Math.cos(azimuthRadians), this.data.angularDirection.y, Math.sin(azimuthRadians));
      },
      getAngularElevation(): number {
        return getElevationFromDirection(this.data.angularDirection);
      },
      setAngularElevation(elevation: number): void {
        const elevationRadians: number = MathUtils.degToRad(elevation);
        const currentAzimuth: number = Math.atan2(this.data.angularDirection.z, this.data.angularDirection.x);

        const newX: number = Math.cos(currentAzimuth) * Math.cos(elevationRadians);
        const newY: number = Math.sin(elevationRadians);
        const newZ: number = Math.sin(currentAzimuth) * Math.cos(elevationRadians);

        this.data.angularDirection.set(newX, newY, newZ).normalize();
      },
      setAngularVelocityFromParams(speed: number, azimuth: number, elevation: number): void {
        this.setAngularSpeed(speed);
        this.setAngularDirectionFromParams(azimuth, elevation);
      }
    },
    doKinematicMove(delta: number): void {
      if (this.kinematic.data.linearSpeed <= 0) return;
      const normalizedDirection: Vector3 = this.kinematic.data.linearDirection.clone().normalize();
      const displacement: Vector3 = normalizedDirection.multiplyScalar(this.kinematic.data.linearSpeed * delta);
      (this as TActorWrapperAsync).addPosition(Vector3Wrapper(displacement));
    },
    doRotation(delta: number): void {
      if (this.kinematic.data.angularSpeed <= 0) return;
      const normalizedAngularDirection: Vector3 = this.kinematic.data.angularDirection.clone().normalize();
      const angle: number = this.kinematic.data.angularSpeed * delta;
      const quaternion: Quaternion = new Quaternion().setFromAxisAngle(normalizedAngularDirection, angle);
      (this as TActorWrapperAsync).entity.quaternion.multiplyQuaternions(quaternion, (this as TActorWrapperAsync).entity.quaternion);
    }
  };
}
