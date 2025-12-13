import type { TActorParams } from '@/Engine/Actor';
import type { TKinematicInfo, TWithKinematic } from '@/Engine/Kinematic/Models';
import type { TKinematicAccessors } from '@/Engine/Kinematic/Models/TKinematicAccessors';
import { getAzimuthByLinearVelocity, getElevationByLinearVelocity, getLinearVelocity, getSpeedByLinearVelocity } from '@/Engine/Math';
import type { TWithPosition3d, TWithRotation } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withKinematic(params: TActorParams): TWithKinematic {
  return {
    setKinematicInfo(kinematic: TKinematicInfo): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).linearVelocity = kinematic.linearVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).angularVelocity = kinematic.angularVelocity;
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicInfo & TKinematicAccessors>).principalInertia = kinematic.principalInertia;
    },
    getKinematicInfo(): TKinematicInfo {
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
    kinematic: {
      linearVelocity: params.kinematic?.linearVelocity ?? undefined,
      angularVelocity: params.kinematic?.angularVelocity ?? undefined,
      principalInertia: params.kinematic?.principalInertia ?? undefined,
      getSpeed(): number {
        if (isNotDefined(this.linearVelocity)) return 0;
        return getSpeedByLinearVelocity(this.linearVelocity);
      },
      getAzimuth(): number {
        if (isNotDefined(this.linearVelocity)) return 0;
        return getAzimuthByLinearVelocity(this.linearVelocity);
      },
      getElevation(): number {
        if (isNotDefined(this.linearVelocity)) return 0;
        return getElevationByLinearVelocity(this.linearVelocity);
      },
      setLinearVelocity(speed: number, azimuth: number, elevation: number): void {
        // eslint-disable-next-line functional/immutable-data
        (this as TWriteable<TKinematicInfo & TKinematicAccessors>).linearVelocity = getLinearVelocity(speed, azimuth, elevation);
      }
    }
  };
}
