import type { TCameraService } from '@hellpig/anarchy-engine/Camera';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
  container: TContainerDecorator;
}>;
