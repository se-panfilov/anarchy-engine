import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TAbstractLightWrapper } from './TAbstractLightWrapper';
import type { TLight } from './TLight';
import type { TAnyLightConfig } from './TLightConfig';
import type { TLightFactory } from './TLightFactory';
import type { TLightParams } from './TLightParams';
import type { TLightRegistry } from './TLightRegistry';

export type TLightService = TWithCreateService<TAbstractLightWrapper<TLight>, TLightParams> &
  TWithCreateFromConfigService<TAnyLightConfig, TAbstractLightWrapper<TLight>> &
  TWithFactoryService<TLightFactory> &
  TWithRegistryService<TLightRegistry> &
  TWithSceneGetterService &
  TDestroyable;
