import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithCreateAsyncService } from '@/Engine/Space';

import type { TMaterialPackParams } from './TMaterialPackParams';
import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialTextureService = TWithCreateAsyncService<TMaterialWrapper, TMaterialPackParams<TMaterialTexturePack>>;
