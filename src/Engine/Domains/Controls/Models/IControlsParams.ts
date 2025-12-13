import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  enableDamping?: boolean;
  tags: ReadonlyArray<ControlsTag | CommonTag | string>;
}>;
