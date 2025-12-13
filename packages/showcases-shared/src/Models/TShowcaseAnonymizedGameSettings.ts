export type TShowcaseAnonymizedGameSettings = Readonly<{
  graphics?: TAnonymizedGraphicsSettings;
  audio?: TAnonymizedAudioSettings;
  localization?: TAnonymizedLocalizationSettings;
  debug?: TAnonymizedDebugSettings;
  internal?: TAnonymizedInternalSettings;
}>;

export type TAnonymizedGraphicsPlatformSpecificSettings = Readonly<{
  isFullScreen?: boolean;
  displayId?: number;
  resolution?: Readonly<{ width: string; height: string }>;
}>;

export type TAnonymizedGraphicsPlatformIndependentSettings = Readonly<{
  brightness: string;
  contrast: string;
}>;

export type TAnonymizedGraphicsSettings = TAnonymizedGraphicsPlatformSpecificSettings & TAnonymizedGraphicsPlatformIndependentSettings;

export type TAnonymizedAudioSettings = Readonly<{
  masterVolume: string;
}>;

export type TAnonymizedLocalizationSettings = Readonly<{
  locale: string;
}>;

export type TAnonymizedDebugSettings = Readonly<{
  isDebugMode: boolean;
}>;

export type TAnonymizedInternalSettings = Readonly<{
  isFirstRun: boolean;
}>;
