import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';

export type TPhysicsService = {
  getDebugRenderer: () => TPhysicsDebugRenderer;
};
