export type IDestroyable = Readonly<{
  isDestroyed: boolean;
  destroy: () => void;
}>;
