export type TAppService = Readonly<{
  closeApp: () => void;
  restartApp: (args?: ReadonlyArray<string>) => void;
}>;
