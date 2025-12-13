import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TAudioLoop } from '@Anarchy/Engine/Audio';
import type { TCollisionsLoop } from '@Anarchy/Engine/Collisions';
import type { TControlsLoop } from '@Anarchy/Engine/Controls';
import type { TIntersectionsLoop } from '@Anarchy/Engine/Intersections';
import type { TKinematicLoop } from '@Anarchy/Engine/Kinematic';
import type { LoopType } from '@Anarchy/Engine/Loop/Constants';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Anarchy/Engine/Mixins';
import type { TMouseLoop } from '@Anarchy/Engine/Mouse';
import type { TPhysicsLoop } from '@Anarchy/Engine/Physics';
import type { TRenderLoop } from '@Anarchy/Engine/Space';
import type { TSpatialLoop } from '@Anarchy/Engine/Spatial';
import type { TTextLoop } from '@Anarchy/Engine/Text';
import type { TTransformLoop } from '@Anarchy/Engine/TransformDrive';

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
