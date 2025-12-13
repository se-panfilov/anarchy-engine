import type { IAppCanvas } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Registries';

export type ILocalFactoryPoolParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
