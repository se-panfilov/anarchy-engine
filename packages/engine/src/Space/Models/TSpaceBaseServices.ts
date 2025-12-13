import type { TLoopService } from '@Engine/Loop';
import type { TScenesService } from '@Engine/Scene';

export type TSpaceBaseServices = Readonly<{ loopService: TLoopService; scenesService: TScenesService }>;
