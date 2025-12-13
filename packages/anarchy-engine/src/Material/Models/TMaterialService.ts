import type { TSerializableEntitiesService } from '@Anarchy/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Anarchy/Engine/Mixins';

import type { TAnyMaterialWrapper } from './TAnyMaterialWrapper';
import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialFactory } from './TMaterialFactory';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialRegistry } from './TMaterialRegistry';

export type TMaterialServiceWithCreate = TWithCreateService<TAnyMaterialWrapper, TMaterialParams>;
export type TMaterialServiceWithCreateFromConfig = TWithCreateFromConfigService<TMaterialConfig, TAnyMaterialWrapper>;
export type TMaterialServiceWithFactory = TWithFactoryService<TAnyMaterialWrapper, TMaterialParams, undefined, TMaterialFactory>;
export type TMaterialServiceWithRegistry = TWithRegistryService<TMaterialRegistry>;

export type TMaterialService = TSerializableEntitiesService<TAnyMaterialWrapper, TMaterialConfig> &
  TMaterialServiceWithCreate &
  TMaterialServiceWithCreateFromConfig &
  TMaterialServiceWithFactory &
  TMaterialServiceWithRegistry;
