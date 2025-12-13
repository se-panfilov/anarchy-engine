// TODO DESKTOP: All fields (including nested) should be optional.
//  So it it's not defined, it means that certain setting is not allowed on a certain platform (e.g. no resolution change in browser)
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

export type TGraphicsSettings = Readonly<{
  // TODO DESKTOP: split platform-specific and common settings
  // Desktop-only settings
  isFullScreen: boolean;
  // isBorderlessWindowed: boolean;
  resolution: TResolution;
  // isVsync: boolean;
  // frameLimit: number; // 0 for no limit
  // isUseHighDPI: boolean;

  // ALl platforms settings:
  // graphicsQuality: 'low' | 'medium' | 'high' | 'ultra'; /// TODO should be an enum
  // brightness: number;
  // contrast: number;
}>;

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
