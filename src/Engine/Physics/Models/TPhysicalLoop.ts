import type { TLoop } from '@/Engine/Loop/Models';

export type TPhysicalLoop = TLoop & { __brand: 'physical_loop' };
