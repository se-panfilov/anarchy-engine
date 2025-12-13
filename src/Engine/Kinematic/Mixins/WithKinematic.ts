import type { TActorParams } from '@/Engine/Actor';
import type { TKinematicInfo, TWithKinematic } from '@/Engine/Kinematic/Models';
import { getAzimuthByLinearVelocity, getElevationByLinearVelocity, getLinearVelocity, getSpeedByLinearVelocity } from '@/Engine/Math';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withKinematic(params: TActorParams): TWithKinematic {
  return {
    setKinematicInfo(kinematic: TKinematicInfo): void {
      // eslint-disable-next-line functional/immutable-data
      this.kinematic.linearVelocity = kinematic.linearVelocity;
      // eslint-disable-next-line functional/immutable-data
      this.kinematic.angularVelocity = kinematic.angularVelocity;
      // eslint-disable-next-line functional/immutable-data
      this.kinematic.principalInertia = kinematic.principalInertia;
    },
    getKinematicInfo(): TKinematicInfo {
      return this.kinematic;
    },
    doKinematicMove(delta: number): void {
      // TODO (S.Panfilov) set or add values?
      this.setPosition(
        Vector3Wrapper({
          x: this.kinematic.linearVelocity.x * delta,
          y: this.kinematic.linearVelocity.y * delta,
          z: this.kinematic.linearVelocity.z * delta
        })
      );
    },
    isKinematicAutoUpdate: params.isKinematicAutoUpdate ?? true,
    doKinematicRotation(delta: number): void {
      // TODO (S.Panfilov) set or add values?
      this.setRotation(this.kinematic.angularVelocity.x * delta, this.kinematic.angularVelocity.y * delta, this.kinematic.angularVelocity.z * delta);
    },
    kinematic: {
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
        this.linearVelocity = getLinearVelocity(speed, azimuth, elevation);
      }
    }
  };
}
