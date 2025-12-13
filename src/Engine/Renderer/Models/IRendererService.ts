import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { IRendererFactory } from './IRendererFactory';
import type { IRendererParams } from './IRendererParams';
import type { IRendererRegistry } from './IRendererRegistry';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererService = TWithCreateService<IRendererWrapper, IRendererParams> &
  TWithActiveAccessorsService<IRendererWrapper> &
  TWithFactoryService<IRendererFactory> &
  TWithRegistryService<IRendererRegistry> &
  TDestroyable;
