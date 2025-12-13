import type { ControlsTag } from '@Engine/Constants';
import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { ICameraWrapper } from '@Engine/Wrappers';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  tags: ReadonlyArray<ControlsTag>;
}>;
