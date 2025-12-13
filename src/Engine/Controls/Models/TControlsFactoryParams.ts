import type { TAppCanvas } from '@/Engine/App';
import type { TCameraRegistry } from '@/Engine/Camera';

export type TControlsFactoryParams = Readonly<{
  canvas: TAppCanvas;
  cameraRegistry: TCameraRegistry;
}>;
