import type { TLoopWithPriority } from '@/Engine/Loop/Models';

export type TSpatialLoop = TLoopWithPriority & { __brand: 'spatial_loop' };
