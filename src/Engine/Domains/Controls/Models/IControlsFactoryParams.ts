import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IAppCanvas } from '@Engine/Models';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
