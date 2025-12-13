import type { IAppCanvas } from '@Engine/Models';
import type { ICameraRegistry } from '@Engine/Registries';

export interface IControlsFactoryParams {
  readonly canvas: IAppCanvas;
  readonly cameraRegistry: ICameraRegistry;
}
