import type { TCameraService } from '@/Engine/Camera';
import type { TScreenService } from '@/Engine/Screen';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
  screenService: TScreenService;
}>;
