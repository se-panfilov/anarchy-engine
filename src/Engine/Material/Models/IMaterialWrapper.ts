import type { IWrapper } from '@/Engine/Abstract';
import type { IWithTagsMixin } from '@/Engine/Mixins';

import type { IMaterials } from './IMaterials';

export type IMaterialWrapper = IWrapper<IMaterials> & IWithTagsMixin;
