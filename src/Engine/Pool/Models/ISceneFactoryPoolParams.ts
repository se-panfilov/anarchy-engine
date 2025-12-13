import type { IAppCanvas } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Registries';

export type ISceneFactoryPoolParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
