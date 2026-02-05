import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TScenesService } from '@hellpig/anarchy-engine/Scene';

export type TSpaceBaseServices = Readonly<{ loopService: TLoopService; scenesService: TScenesService }>;
