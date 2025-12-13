import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { ControlsTag } from '@Engine/Domains/Controls';
import type { IAppCanvas } from '@Engine/Models/IAppCanvas';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  tags: ReadonlyArray<ControlsTag>;
}>;
