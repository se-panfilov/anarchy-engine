import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { ICameraWrapper } from '@Engine/Wrappers';

export interface IControlsParams {
  readonly camera: ICameraWrapper;
  readonly canvas: IAppCanvas;
}
