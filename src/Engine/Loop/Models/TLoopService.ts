import type { TAudioLoop } from '@/Engine/Audio';
import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { LoopType } from '@/Engine/Loop/Constants';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

import type { TLoop } from './TLoop';
import type { TLoopFactory } from './TLoopFactory';
import type { TLoopParams } from './TLoopParams';
import type { TLoopRegistry } from './TLoopRegistry';

export type TLoopService = Readonly<{
  getRenderLoop: (name?: string) => TRenderLoop | never;
  getAudioLoop: (name?: string) => TAudioLoop | never;
  getPhysicalLoop: (name?: string) => TPhysicalLoop | never;
  getCollisionsLoop: (name?: string) => TCollisionsLoop | never;
  getKinematicLoop: (name?: string) => TKinematicLoop | never;
  getSpatialLoop: (name?: string) => TSpatialLoop | never;
  getTransformLoop: (name?: string) => TTransformLoop | never;
  getTextLoop: (name?: string) => TTextLoop | never;
  getKeyboardLoop: (name?: string) => TKeyboardLoop | never;
  getMouseLoop: (name?: string) => TMouseLoop | never;
  getIntersectionsLoop: (name?: string) => TIntersectionsLoop | never;
  getControlsLoop: (name?: string) => TControlsLoop | never;
  getLoop: (name: string | undefined, type: LoopType) => TLoop | never;
}> &
  TWithCreateService<TLoop, TLoopParams> &
  TWithFactoryService<TLoopFactory> &
  TWithRegistryService<TLoopRegistry> &
  TDestroyable;
