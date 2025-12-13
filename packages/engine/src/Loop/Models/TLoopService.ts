import type { TAbstractService } from '@/Abstract';
import type { TAudioLoop } from '@/Audio';
import type { TCollisionsLoop } from '@/Collisions';
import type { TControlsLoop } from '@/Controls';
import type { TIntersectionsLoop } from '@/Intersections';
import type { TKeyboardLoop } from '@/Keyboard';
import type { TKinematicLoop } from '@/Kinematic';
import type { LoopType } from '@/Loop/Constants';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Mixins';
import type { TMouseLoop } from '@/Mouse';
import type { TPhysicsLoop } from '@/Physics';
import type { TRenderLoop } from '@/Space';
import type { TSpatialLoop } from '@/Spatial';
import type { TTextLoop } from '@/Text';
import type { TTransformLoop } from '@/TransformDrive';

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
