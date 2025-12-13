import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { ICameraWrapper } from '@Engine/Wrappers';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
}>;
