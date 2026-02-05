import type { TCameraService } from '@hellpig/anarchy-engine/Camera';

export type TControlsServiceDependencies = Readonly<{
  cameraService: TCameraService;
}>;
