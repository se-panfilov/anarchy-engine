import type { IAppCanvas } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Registries';

export type IControlsFactoryParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
