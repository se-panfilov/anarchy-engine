import type { IAppCanvas } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Domains/Camera/Models';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
