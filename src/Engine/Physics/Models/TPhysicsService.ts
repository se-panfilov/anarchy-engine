import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TPhysicsDebugRenderer } from './TPhysicsDebugRenderer';

export type TPhysicsService = {
  getDebugRenderer: () => TPhysicsDebugRenderer;
  setGravity: (vector: TVector3Wrapper) => void;
};
