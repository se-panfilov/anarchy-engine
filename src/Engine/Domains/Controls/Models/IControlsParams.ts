import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IControlsParams = Readonly<{
  camera: ICameraWrapper;
  canvas: IAppCanvas;
  enableDamping?: boolean;
}> &
  IWithReadonlyTags<ControlsTag>;
