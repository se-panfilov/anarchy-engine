import type { TCameraConfig, TCameraWrapper } from '@/Engine/Camera/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';

export function cameraToConfig(entity: TCameraWrapper): TCameraConfig {
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
    ...extractRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  } as any;
}
