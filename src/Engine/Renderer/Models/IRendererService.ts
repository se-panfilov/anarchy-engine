import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { IRendererFactory } from './IRendererFactory';
import type { IRendererParams } from './IRendererParams';
import type { IRendererRegistry } from './IRendererRegistry';
import type { TRendererWrapper } from './TRendererWrapper';

export type IRendererService = TWithCreateService<TRendererWrapper, IRendererParams> &
  TWithActiveAccessorsService<TRendererWrapper> &
  TWithFactoryService<IRendererFactory> &
  TWithRegistryService<IRendererRegistry> &
  TDestroyable;
