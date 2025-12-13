import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithActiveAccessorsService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IRendererFactory } from './IRendererFactory';
import type { IRendererParams } from './IRendererParams';
import type { IRendererRegistry } from './IRendererRegistry';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererService = IWithCreateService<IRendererWrapper, IRendererParams> &
  IWithActiveAccessorsService<IRendererWrapper> &
  IWithFactoryService<IRendererFactory> &
  IWithRegistryService<IRendererRegistry> &
  IDestroyable;
