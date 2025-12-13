import type { ICameraRegistry } from '@Engine/Domains/Camera/Models';
import type { IAppCanvas } from '@Engine/Models';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
