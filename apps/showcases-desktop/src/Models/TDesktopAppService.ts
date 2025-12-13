export type TDesktopAppService = Readonly<{
  closeApp: () => void;
  isExiting: () => boolean;
  restartApp: (args?: ReadonlyArray<string>) => void;
}>;
