import type { TLoopService } from '@/Loop';
import type { TScenesService } from '@/Scene';

export type TSpaceBaseServices = Readonly<{ loopService: TLoopService; scenesService: TScenesService }>;
