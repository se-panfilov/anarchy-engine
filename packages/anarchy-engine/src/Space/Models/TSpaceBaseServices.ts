import type { TLoopService } from '@Anarchy/Engine/Loop';
import type { TScenesService } from '@Anarchy/Engine/Scene';

export type TSpaceBaseServices = Readonly<{ loopService: TLoopService; scenesService: TScenesService }>;
