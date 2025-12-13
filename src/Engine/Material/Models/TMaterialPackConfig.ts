import type { MaterialType } from '@/Engine/Material/Constants';
import type { TWithNameRequired, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialPackConfig<T extends TMaterialTexturePack> = Readonly<{ type: MaterialType; params?: Omit<TMaterialConfig, 'type'>; textures?: T }> & TWithNameRequired & TWithReadonlyTags;
