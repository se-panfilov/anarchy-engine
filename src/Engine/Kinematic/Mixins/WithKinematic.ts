import { Vector3 } from 'three';

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
      const { x, y, z } = this.kinematic.linearVelocity;
      const displacement: Vector3 = new Vector3(x, y, z).clone().multiplyScalar(delta);
      (this as unknown as TWithPosition3d).addPosition(Vector3Wrapper(displacement));
      // this.entity.position.add(displacement);

      // (this as unknown as TWithPosition3d).setPosition(
      //   Vector3Wrapper({
      //     x: this.kinematic.linearVelocity.x * delta,
      //     y: this.kinematic.linearVelocity.y * delta,
      //     z: this.kinematic.linearVelocity.z * delta
      //   })
      // );
    },
    isKinematicAutoUpdate: params.isKinematicAutoUpdate ?? false,
    doKinematicRotation(delta: number): void {
      if (isNotDefined(this.kinematic.angularVelocity)) return;
      // TODO (S.Panfilov) set or add values?
      (this as unknown as TWithRotation).setRotation(this.kinematic.angularVelocity.x * delta, this.kinematic.angularVelocity.y * delta, this.kinematic.angularVelocity.z * delta);
    },
    getKinematicSpeed(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getSpeedByLinearVelocity(this.kinematic.linearVelocity);
    },
    setKinematicSpeed(speed: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(speed, this.getKinematicAzimuth(), this.getKinematicElevation());
    },
    getKinematicAzimuth(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getAzimuthByLinearVelocity(this.kinematic.linearVelocity);
    },
    setKinematicAzimuth(azimuth: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(this.getKinematicSpeed(), azimuth, this.getKinematicElevation());
    },
    getKinematicElevation(): number {
      if (isNotDefined(this.kinematic.linearVelocity)) return 0;
      return getElevationByLinearVelocity(this.kinematic.linearVelocity);
    },
    setKinematicElevation(elevation: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(this.getKinematicSpeed(), this.getKinematicAzimuth(), elevation);
    },
    setKinematicLinearVelocity(speed: number, azimuth: number, elevation: number): void {
      // eslint-disable-next-line functional/immutable-data
      (this.kinematic as TWriteable<TKinematicData>).linearVelocity = getLinearVelocity(speed, azimuth, elevation);
    }
  };
}
