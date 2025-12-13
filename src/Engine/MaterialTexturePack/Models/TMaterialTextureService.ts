import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithCreateAsyncService, TWithCreateFromConfigService } from '@/Engine/Space';

import type { TMaterialPackConfig } from './TMaterialPackConfig';
import type { TMaterialPackParams } from './TMaterialPackParams';
import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialTextureService = TWithCreateAsyncService<TMaterialWrapper, TMaterialPackParams<TMaterialTexturePack>> & TWithCreateFromConfigService<TMaterialPackConfig<TMaterialTexturePack>>;
