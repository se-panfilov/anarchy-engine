// TODO DESKTOP: should extend (or being replaced by) TAppSettings from apps' layer
export type TAppSettings = Readonly<{
  graphics: TGraphicsSettings;
  audio: TAudioOptions;
  localization: TLocalizationSettings;
  // controls: TControlsSettings;
  // accessibility: TAccessibilitySettings;
  debug: TDebugSettings;
  internal: TInternalSettings;
}>;

export type TGraphicsSettings = Readonly<{
  isFullscreen: boolean;
  // isBorderlessWindowed: boolean;
  resolution: { width: number; height: number };
  // isVsync: boolean;
  // frameLimit: number; // 0 for no limit
  // isUseHighDPI: boolean;
  // graphicsQuality: 'low' | 'medium' | 'high' | 'ultra'; /// TODO should be an enum
  // brightness: number;
  // contrast: number;
}>;

export type TAudioOptions = Readonly<{
  masterVolume: number;
  // musicVolume: number;
  // sfxVolume: number;
  // voiceVolume: number;
  // isMuteWhenUnfocused: boolean;
}>;

export type TLocalizationSettings = Readonly<{
  language: string; /// TODO should be an enum
  // isSubtitlesEnabled: boolean;
  // subtitleSize: 'small' | 'normal' | 'large'; // TODO should be an enum
}>;

export type TControlsSettings = Readonly<{
  mouseSensitivity: number;
  invertY: boolean;
  keybindings: Record<string, string>; // TODO DESKTOP: keybindings should have a specific type.
}>;

export type TAccessibilitySettings = Readonly<{
  uiScale: number;
  highContrastUI: boolean;
  reduceMotion: boolean;
  colorblindMode: 'off' | 'protanopia' | 'deuteranopia' | 'tritanopia'; /// TODO should be an enum
}>;

export type TDebugSettings = Readonly<{
  isDebugMode: boolean;
  // logToFile: boolean;
}>;

export type TInternalSettings = Readonly<{
  isFirstRun: boolean;
}>;
