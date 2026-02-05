import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioLoop } from '@hellpig/anarchy-engine/Audio';
import type { TCollisionsLoop } from '@hellpig/anarchy-engine/Collisions';
import type { TControlsLoop } from '@hellpig/anarchy-engine/Controls';
import type { TIntersectionsLoop } from '@hellpig/anarchy-engine/Intersections';
import type { TKinematicLoop } from '@hellpig/anarchy-engine/Kinematic';
import type { LoopType } from '@hellpig/anarchy-engine/Loop/Constants';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@hellpig/anarchy-engine/Mixins';
import type { TMouseLoop } from '@hellpig/anarchy-engine/Mouse';
import type { TPhysicsLoop } from '@hellpig/anarchy-engine/Physics';
import type { TRenderLoop } from '@hellpig/anarchy-engine/Space';
import type { TSpatialLoop } from '@hellpig/anarchy-engine/Spatial';
import type { TTextLoop } from '@hellpig/anarchy-engine/Text';
import type { TTransformLoop } from '@hellpig/anarchy-engine/TransformDrive';

import type { TLoop } from './TLoop';
import type { TLoopFactory } from './TLoopFactory';
import type { TLoopParams } from './TLoopParams';
import type { TLoopRegistry } from './TLoopRegistry';

export type TLoopServiceWithCreate = TWithCreateService<TLoop, TLoopParams>;
export type TLoopServiceWithFactory = TWithFactoryService<TLoop, TLoopParams, undefined, TLoopFactory>;
export type TLoopServiceWithRegistry = TWithRegistryService<TLoopRegistry>;

export type TLoopService = TAbstractService &
  Readonly<{
    getRenderLoop: (name?: string) => TRenderLoop;
    getAudioLoop: (name?: string) => TAudioLoop;
    getPhysicsLoop: (name?: string) => TPhysicsLoop;
    getCollisionsLoop: (name?: string) => TCollisionsLoop;
    getKinematicLoop: (name?: string) => TKinematicLoop;
    getSpatialLoop: (name?: string) => TSpatialLoop;
    getTransformLoop: (name?: string) => TTransformLoop;
    getTextLoop: (name?: string) => TTextLoop;
    getMouseLoop: (name?: string) => TMouseLoop;
    getIntersectionsLoop: (name?: string) => TIntersectionsLoop;
    getControlsLoop: (name?: string) => TControlsLoop;
    getLoop: (name: string | undefined, type: LoopType) => TLoop;
  }> &
  TLoopServiceWithCreate &
  TLoopServiceWithFactory &
  TLoopServiceWithRegistry;
