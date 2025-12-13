export type TWithActiveMixin = Readonly<{
  _setActive: (isActive: boolean, isFromService?: boolean) => void;
  isActive: () => boolean;
  _isActive: boolean;
}>;
