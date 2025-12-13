import type { TCameraService } from '@/Engine/Camera';

export type TControlsServiceDependencies = Readonly<{
  cameraService: TCameraService;
}>;
