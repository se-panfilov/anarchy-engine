import type { IDestroyable } from '@/Engine/Mixins';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IControlsRegistry } from './IControlsRegistry';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsService = Readonly<{
  create: (params: IControlsParams) => IControlsWrapper;
  createFromConfig: (controls: ReadonlyArray<IControlsConfig>) => void;
  setActiveControls: (controlsId: string) => void;
  findActiveControls: (controlsRegistry: IControlsRegistry) => IControlsWrapper | undefined;
  startUpdatingControlsAspect: (isOnlyActive: boolean) => void;
}> &
  IDestroyable;
