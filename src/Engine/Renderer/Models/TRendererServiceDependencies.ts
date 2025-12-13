import type { TCameraService } from '@/Engine/Camera';

export type TRendererServiceDependencies = Readonly<{
  cameraService: TCameraService;
}>;
