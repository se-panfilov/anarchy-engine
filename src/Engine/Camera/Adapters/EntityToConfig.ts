import type { TCameraConfig, TCameraWrapper } from '@/Engine/Camera/Models';

export function entityToConfig(entity: TCameraWrapper): TCameraConfig {
  const { drive } = entity;
  // TODO 15-0-0: implement

  return {
    //  fov?: number;
    //   near?: number;
    //   far?: number;
    //   lookAt?: Vector3;
    //   audioListener?: AudioListener;
    //   name: string;
    //   isActive: boolean
    //   tags
    ...drive.serialize()
    // TODO 15-0-0: fix any
  } as any;
}
