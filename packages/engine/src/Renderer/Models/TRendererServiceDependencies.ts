import type { TCameraService } from '@/Camera';
import type { TContainerDecorator } from '@/Global';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
  container: TContainerDecorator;
}>;
