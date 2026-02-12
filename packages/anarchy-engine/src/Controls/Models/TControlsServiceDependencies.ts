import type { TCameraService } from '@Anarchy/Engine/Camera';

export type TControlsServiceDependencies = Readonly<{
  cameraService: TCameraService;
}>;
