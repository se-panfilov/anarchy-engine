import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IAppCanvas } from '@Engine/Domains/App';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
