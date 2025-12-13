import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IAppCanvas } from '@Engine/Domains/App';

export type ILocalFactoryPoolParams = Readonly<{
  canvas: IAppCanvas;
  cameraRegistry: ICameraRegistry;
}>;
