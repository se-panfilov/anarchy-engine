import type { TMaterialWrapper } from '@/Engine/Material';
import type { TWithCreateAsyncService } from '@/Engine/Space';

import type { IMaterialPackParams } from './IMaterialPackParams';
import type { TMaterialTexturePack } from './TMaterialTexturePack';

export type TMaterialTextureService = TWithCreateAsyncService<TMaterialWrapper, IMaterialPackParams<TMaterialTexturePack>>;
