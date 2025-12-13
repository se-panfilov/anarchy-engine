export type TPhysicsDebugRenderer = Readonly<{
  update: () => void;
  isEnabled: () => boolean;
  enable: () => void;
  disable: () => void;
}>;
