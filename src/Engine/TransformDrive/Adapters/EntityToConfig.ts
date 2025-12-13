import type { TTransformDrive, TTransformDriveSerializedData } from '@/Engine/TransformDrive/Models';

export function transformDriveToConfig({ position$, rotation$, scale$, agent$ }: TTransformDrive<any>): TTransformDriveSerializedData {
  // TODO 15-0-0: Agent's data also should be serializable and available via config
  return {
    position: position$.value,
    rotation: rotation$.value,
    scale: scale$.value,
    agent: agent$.value
  };
}
