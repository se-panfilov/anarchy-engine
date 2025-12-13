import type { TLocale } from '@Anarchy/i18n';

export type TShowcaseGameSettings = Readonly<{
  graphics: TGraphicsSettings;
  audio: TAudioSettings;
  localization: TLocalizationSettings;
  // controls: TControlsSettings;
  // accessibility: TAccessibilitySettings;
  debug: TDebugSettings;
  internal: TInternalSettings;
}>;

export type TGraphicsPlatformSpecificSettings = Readonly<{
  isFullScreen?: boolean;
  displayId?: number; // For multi-monitor setups, identifies which monitor to use (by index). 0 is primary monitor.
  // isBorderlessWindowed: boolean;
  resolution?: TResolution;
  // isVsync: boolean;
  // frameLimit: number; // 0 for no limit
  // isUseHighDPI: boolean;
}>;

export type TGraphicsPlatformIndependentSettings = Readonly<{
  // graphicsQuality: 'low' | 'medium' | 'high' | 'ultra'; /// TODO should be an enum
  brightness: number;
  contrast: number;
}>;

export type TGraphicsSettings = TGraphicsPlatformSpecificSettings & TGraphicsPlatformIndependentSettings;

export type TResolution = Readonly<{
  width: number;
  height: number;
}>;

export type TAudioSettings = Readonly<{
  masterVolume: number;
  // musicVolume: number;
  // sfxVolume: number;
  // voiceVolume: number;
  // isMuteWhenUnfocused: boolean;
}>;

export type TLocalizationSettings = Readonly<{
  locale: TLocale;
  // isSubtitlesEnabled: boolean;
  // subtitleSize: 'small' | 'normal' | 'large'; // TODO should be an enum
}>;

export type TControlsSettings = Readonly<{
  mouseSensitivity: number;
  invertY: boolean;
  keybindings: Record<string, string>; // TODO keybindings should have a specific type.
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
