import type { TLoopService } from '@/Engine/Loop';
import type { TScenesService } from '@/Engine/Scene';
import type { TScreenService } from '@/Engine/Screen';

export type TSpaceBaseServices = Readonly<{ loopService: TLoopService; scenesService: TScenesService; screenService: TScreenService }>;
