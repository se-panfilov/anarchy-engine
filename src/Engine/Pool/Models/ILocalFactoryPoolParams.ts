import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IAppCanvas } from '@Engine/Models';

export type ILocalFactoryPoolParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
