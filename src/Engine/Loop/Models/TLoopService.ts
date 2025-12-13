import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { LoopType } from '@/Engine/Loop/Constants';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';

import type { TLoop } from './TLoop';
import type { TLoopFactory } from './TLoopFactory';
import type { TLoopParams } from './TLoopParams';
import type { TLoopRegistry } from './TLoopRegistry';

export type TLoopService = Readonly<{
  getCollisionsLoop: (name?: string) => TCollisionsLoop | never;
  getKinematicLoop: (name?: string) => TKinematicLoop | never;
  getPhysicalLoop: (name?: string) => TPhysicalLoop | never;
  getRenderLoop: (name?: string) => TRenderLoop | never;
  getSpatialLoop: (name?: string) => TSpatialLoop | never;
  getLoop: (name: string | undefined, type: LoopType) => TLoop | never;
}> &
  TWithCreateService<TLoop, TLoopParams> &
  TWithFactoryService<TLoopFactory> &
  TWithRegistryService<TLoopRegistry> &
  TDestroyable;
