import type { TCameraService } from '@Anarchy/Engine/Camera';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
  container: TContainerDecorator;
}>;
