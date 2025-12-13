import type { TAppCanvas } from '@/Engine/App';
import type { ICameraRegistry } from '@/Engine/Camera';

export type IControlsFactoryParams = Readonly<{
  canvas: TAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
