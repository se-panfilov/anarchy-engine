import type { TCameraService } from '@Engine/Camera';
import type { TContainerDecorator } from '@Engine/Global';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
  container: TContainerDecorator;
}>;
