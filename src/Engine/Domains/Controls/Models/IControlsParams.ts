import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { ControlsTag } from '@Engine/Domains/Controls/Constants';
import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  tags: ReadonlyArray<ControlsTag>;
}>;
