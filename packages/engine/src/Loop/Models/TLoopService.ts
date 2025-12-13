import type { TAbstractService } from '@/Engine/Abstract';
import type { TAudioLoop } from '@/Engine/Audio';
import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { LoopType } from '@/Engine/Loop/Constants';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicsLoop } from '@/Engine/Physics';
import type { TRenderLoop } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

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
    getKeyboardLoop: (name?: string) => TKeyboardLoop;
    getMouseLoop: (name?: string) => TMouseLoop;
    getIntersectionsLoop: (name?: string) => TIntersectionsLoop;
    getControlsLoop: (name?: string) => TControlsLoop;
    getLoop: (name: string | undefined, type: LoopType) => TLoop;
  }> &
  TLoopServiceWithCreate &
  TLoopServiceWithFactory &
  TLoopServiceWithRegistry;
