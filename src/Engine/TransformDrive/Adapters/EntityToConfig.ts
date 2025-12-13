import type { TTransformDrive, TTransformDriveSerializedData } from '@/Engine/TransformDrive/Models';

export function entityToConfig({ position$, rotation$, scale$, agent$ }: TTransformDrive<any>): TTransformDriveSerializedData {
  return {
    position: position$.value,
    rotation: rotation$.value,
    scale: scale$.value,
    agent: agent$.value
  };
}
