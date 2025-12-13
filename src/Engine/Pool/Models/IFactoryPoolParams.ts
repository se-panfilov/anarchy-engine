import type { ICameraRegistry } from '@Engine/Registries';
import type { IAppCanvas } from '@Engine/Models';

export type IFactoryPoolParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
