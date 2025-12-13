import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IAppCanvas } from '@Engine/Models/IAppCanvas';

import type { ControlsTag } from '../Constants';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  tags: ReadonlyArray<ControlsTag>;
}>;
