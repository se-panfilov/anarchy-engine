export type TDesktopAppService = Readonly<{
  closeApp: () => void;
  restartApp: (args: ReadonlyArray<string>) => void;
}>;
