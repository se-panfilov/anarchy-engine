import type { TActorParams } from '@/Engine/Actor';
import { getAzimuthByLinearVelocity, getElevationByLinearVelocity, getSpeedByLinearVelocity } from '@/Engine/Math';
import type { TWithKinematic } from '@/Engine/Mixins/GameObjects/Models';
import type { TKinematicInfo } from '@/Engine/Physics/Models';

export function withKinematic(params: TActorParams): TWithKinematic {
  return {
    setKinematicInfo: function (kinematic: TKinematicInfo): void {
      this.kinematic = kinematic;
    },
    getKinematicInfo: function (): TKinematicInfo {
      return this.kinematic;
    },
    kinematic: {
      mass: params.physics?.mass ?? 0,
      linearVelocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      principalInertia: { x: 0, y: 0, z: 0 },
      getSpeed: function (): number {
        return getSpeedByLinearVelocity((this as any).kinematic.linearVelocity);
      },
      getAzimuth: function (): number {
        return getAzimuthByLinearVelocity((this as any).kinematic.linearVelocity);
      },
      getElevation: function (): number {
        return getElevationByLinearVelocity((this as any).kinematic.linearVelocity);
      }
    }
  };
}
