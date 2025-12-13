import type { World } from '@dimforge/rapier3d';

import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsService = {
  createWorld: (physicsWorldParams: TPhysicsWorldParams) => World;
  addPresets: (presets: ReadonlyArray<TPhysicsPresetParams>) => void;
  addPresetsFromConfig: (presets: ReadonlyArray<TPhysicsPresetConfig>) => void;
  getDebugRenderer: () => TPhysicsDebugRenderer;
  setGravity: (vector: TVector3Wrapper) => void;
  getWorld: () => World | undefined;
};
