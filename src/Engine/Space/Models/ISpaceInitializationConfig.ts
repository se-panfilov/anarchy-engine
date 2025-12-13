export type ISpaceInitializationConfig = Readonly<{
  isScenesInit?: boolean;
  isActorsInit?: boolean;
  isCamerasInit?: boolean;
  isLightsInit?: boolean;
  isFogsInit?: boolean;
  isTextsInit?: boolean;
  isControlsInit?: boolean;
  isEnvMapsInit?: boolean;
  isRendererInit?: boolean;
  isLoopInit?: boolean;
  isInitIntersections?: boolean;
}>;
