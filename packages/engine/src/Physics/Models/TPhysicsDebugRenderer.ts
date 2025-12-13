import type { TDestroyable } from '@/Mixins';

export type TPhysicsDebugRenderer = Readonly<{
  update: () => void;
  isEnabled: () => boolean;
  start: () => void;
  stop: () => void;
}> &
  TDestroyable;
