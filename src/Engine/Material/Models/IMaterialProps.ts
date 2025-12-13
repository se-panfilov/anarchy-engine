import type { MaterialType } from '@/Engine/Material';

import type { IMaterialParams } from './IMaterialParams';

export type IMaterialProps = Readonly<{ type: MaterialType; params?: IMaterialParams }>;
