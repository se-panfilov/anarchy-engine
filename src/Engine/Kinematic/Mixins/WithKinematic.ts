import type { TActorParams } from '@/Engine/Actor';
import type { TKinematicData, TWithKinematic } from '@/Engine/Kinematic/Models';
import { getAzimuthByLinearVelocity, getElevationByLinearVelocity, getLinearVelocity, getSpeedByLinearVelocity } from '@/Engine/Math';
import type { TWithPosition3d, TWithRotation } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withKinematic(params: TActorParams): TWithKinematic {
  return {
    kinematic: {
      linearVelocity: params.kinematic?.linearVelocity ?? undefined,
      angularVelocity: params.kinematic?.angularVelocity ?? undefined,
      principalInertia: params.kinematic?.principalInertia ?? undefined
    },
    setKinematicData(kinematic: TKinematicData): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = kinematic.linearVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).angularVelocity = kinematic.angularVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).principalInertia = kinematic.principalInertia;
    },
    getKinematicData(): TKinematicData {
      return this.kinematic;
    },
    doKinematicMove(delta: number): void {
      if (isNotDefined(this.kinematic.linearVelocity)) return;
      // TODO (S.Panfilov) set or add values?
      (this as unknown as TWithPosition3d).setPosition(
        Vector3Wrapper({
          x: this.kinematic.linearVelocity.x * delta,
          y: this.kinematic.linearVelocity.y * delta,
          z: this.kinematic.linearVelocity.z * delta
        })
      );
    },
    isKinematicAutoUpdate: params.isKinematicAutoUpdate ?? true,
    doKinematicRotation(delta: number): void {
      if (isNotDefined(this.kinematic.angularVelocity)) return;
      // TODO (S.Panfilov) set or add values?
      (this as unknown as TWithRotation).setRotation(this.kinematic.angularVelocity.x * delta, this.kinematic.angularVelocity.y * delta, this.kinematic.angularVelocity.z * delta);
    },
    getSpeed(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getSpeedByLinearVelocity(this.kinematic.linearVelocity);
    },
    setSpeed(speed: number, azimuth: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(speed, azimuth, this.getElevation());
    },
    getAzimuth(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getAzimuthByLinearVelocity(this.kinematic.linearVelocity);
    },
    setAzimuth(azimuth: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(this.getSpeed(), azimuth, this.getElevation());
    },
    getElevation(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getElevationByLinearVelocity(this.kinematic.linearVelocity);
    },
    setElevation(elevation: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(this.getSpeed(), this.getAzimuth(), elevation);
    },
    setLinearVelocity(speed: number, azimuth: number, elevation: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(speed, azimuth, elevation);
    }
  };
}
