import type { TLoop } from '@/Engine/Loop/Models';

export type TKinematicLoop = TLoop & { __brand: 'kinematic_loop' };
