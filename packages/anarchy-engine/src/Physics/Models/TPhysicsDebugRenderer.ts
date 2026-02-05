import type { TDestroyable } from '@hellpig/anarchy-engine/Mixins';

export type TPhysicsDebugRenderer = Readonly<{
  update: () => void;
  isEnabled: () => boolean;
  start: () => void;
  stop: () => void;
}> &
  TDestroyable;
