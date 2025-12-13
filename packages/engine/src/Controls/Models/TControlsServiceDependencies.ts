import type { TCameraService } from '@/Camera';

export type TControlsServiceDependencies = Readonly<{
  cameraService: TCameraService;
}>;
