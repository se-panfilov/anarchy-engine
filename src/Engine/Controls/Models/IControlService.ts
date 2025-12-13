import type { IDestroyable } from '@/Engine/Mixins';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsService = Readonly<{
  create: (params: IControlsParams) => IControlsWrapper;
  createFromConfig: (controls: ReadonlyArray<IControlsConfig>) => void;
  setActiveControls: (controlsId: string) => void;
  findActiveControls: () => IControlsWrapper | undefined;
}> &
  IDestroyable;
