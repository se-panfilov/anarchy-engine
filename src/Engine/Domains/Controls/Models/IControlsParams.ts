import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { ControlsTag } from '@Engine/Domains/Controls/Constants';
import type { IAppCanvas } from '@Engine/Models/IAppCanvas';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  tags: ReadonlyArray<ControlsTag>;
}>;
