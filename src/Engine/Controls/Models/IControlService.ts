import type { ICameraRegistry } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsFactory } from './IControlsFactory';
import type { IControlsParams } from './IControlsParams';
import type { IControlsRegistry } from './IControlsRegistry';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsService = Readonly<{
  create: (params: IControlsParams) => IControlsWrapper;
  createFromConfig: (controls: ReadonlyArray<IControlsConfig>, camerasRegistry: ICameraRegistry) => void;
  setActiveControls: (controlsId: string) => void;
  findActiveControls: () => IControlsWrapper | undefined;
  getFactory: () => IControlsFactory;
  getRegistry: () => IControlsRegistry;
}> &
  IDestroyable;
