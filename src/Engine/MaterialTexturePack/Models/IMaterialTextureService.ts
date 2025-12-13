import type { IMaterialWrapper } from '@/Engine/Material';
import type { IWithCreateAsyncService } from '@/Engine/Space';

import type { IMaterialPackProps } from './IMaterialPackProps';
import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IMaterialTextureService = IWithCreateAsyncService<IMaterialWrapper, IMaterialPackProps<IMaterialTexturePack>>;
