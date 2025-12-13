import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TRendererFactory } from './TRendererFactory';
import type { TRendererParams } from './TRendererParams';
import type { TRendererRegistry } from './TRendererRegistry';
import type { TRendererWrapper } from './TRendererWrapper';

export type TRendererService = TWithCreateService<TRendererWrapper, TRendererParams> &
  TWithActiveAccessorsService<TRendererWrapper> &
  TWithFactoryService<TRendererFactory> &
  TWithRegistryService<TRendererRegistry> &
  TDestroyable;
