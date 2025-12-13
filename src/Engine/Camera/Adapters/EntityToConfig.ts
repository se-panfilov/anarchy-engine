import type { TCameraConfig, TCameraWrapper } from '@/Engine/Camera/Models';

export function entityToConfig(entity: TCameraWrapper): TCameraConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement

  return {
    ...drive.serialize()
  };
}
