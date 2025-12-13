import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry } from '@/Engine/Camera';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
