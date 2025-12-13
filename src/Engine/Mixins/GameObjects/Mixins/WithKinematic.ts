import type { TActorParams } from '@/Engine/Actor';
import { getAzimuthByLinearVelocity, getElevationByLinearVelocity, getLinearVelocity, getSpeedByLinearVelocity } from '@/Engine/Math';
import type { TKinematicAccessors, TWithKinematic } from '@/Engine/Mixins/GameObjects/Models';
import type { TKinematicInfo } from '@/Engine/Physics/Models';
import type { TWriteable } from '@/Engine/Utils';

export function withKinematic(params: TActorParams): TWithKinematic {
  return {
    setKinematicInfo(kinematic: TKinematicInfo): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).linearVelocity = kinematic.linearVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).angularVelocity = kinematic.angularVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).principalInertia = kinematic.principalInertia;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).mass = kinematic.mass;
    },
    getKinematicInfo(): TKinematicInfo {
      return this.kinematic;
    },
    kinematic: {
      mass: params.physics?.mass ?? 0,
      linearVelocity: params.kinematic?.linearVelocity ?? { x: 0, y: 0, z: 0 },
      angularVelocity: params.kinematic?.angularVelocity ?? { x: 0, y: 0, z: 0 },
      principalInertia: params.kinematic?.principalInertia ?? { x: 0, y: 0, z: 0 },
      getSpeed(): number {
        return getSpeedByLinearVelocity(this.linearVelocity);
      },
      getAzimuth(): number {
        return getAzimuthByLinearVelocity(this.linearVelocity);
      },
      getElevation(): number {
        return getElevationByLinearVelocity(this.linearVelocity);
      },
      setLinearVelocity(speed: number, azimuth: number, elevation: number): void {
        // eslint-disable-next-line functional/immutable-data
        (this as TWriteable<TKinematicInfo & TKinematicAccessors>).linearVelocity = getLinearVelocity(speed, azimuth, elevation);
      }
    }
  };
}
