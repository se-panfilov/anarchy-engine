import type { IMaterialWrapper } from '@/Engine/Material';
import type { IWithCreateAsyncService } from '@/Engine/Space';

import type { IMaterialPackParams } from './IMaterialPackParams';
import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IMaterialTextureService = IWithCreateAsyncService<IMaterialWrapper, IMaterialPackParams<IMaterialTexturePack>>;
