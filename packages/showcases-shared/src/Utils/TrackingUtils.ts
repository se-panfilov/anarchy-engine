import { getLangFromLocaleId } from '@Anarchy/i18n';
import { isDefined } from '@Anarchy/Shared/Utils';
import type {
  TAnonymizedAudioSettings,
  TAnonymizedDebugSettings,
  TAnonymizedGraphicsSettings,
  TAnonymizedInternalSettings,
  TAnonymizedLocalizationSettings,
  TDistName,
  TReleaseName,
  TShowcaseAnonymizedGameSettings,
  TShowcasesGameSettings
} from '@Showcases/Shared/Models';

export const makeReleaseName = (prefix: string, version: string): TReleaseName => `${prefix}@${version}`;

export const makeDistName = (platform: string, arch: string): TDistName => `${platform}-${arch}`;

export function getBucketedValue(value: number, step: number): string {
  const bucket: number = Math.floor(value / step) * step;
  return `${bucket}-${bucket + step - 1}`;
}

export function getAnonymizedSettings(settings: TShowcasesGameSettings): TShowcaseAnonymizedGameSettings {
  const { graphics: originGraphics, internal: originInternal, audio: originAudio, debug: originDebug, localization: originLocalization } = settings;

  const graphics: TAnonymizedGraphicsSettings = {
    isFullScreen: originGraphics.isFullScreen,
    displayId: originGraphics.displayId,
    resolution: isDefined(originGraphics.resolution)
      ? {
          width: getBucketedValue(originGraphics.resolution.width, 200),
          height: getBucketedValue(originGraphics.resolution.height, 200)
        }
      : undefined,
    brightness: getBucketedValue(originGraphics.brightness, 10),
    contrast: getBucketedValue(originGraphics.contrast, 10)
  };
  const internal: TAnonymizedInternalSettings = { isFirstRun: originInternal.isFirstRun };
  const audio: TAnonymizedAudioSettings = { masterVolume: getBucketedValue(originAudio.masterVolume, 10) };
  const debug: TAnonymizedDebugSettings = { isDebugMode: originDebug.isDebugMode };
  const localization: TAnonymizedLocalizationSettings = { locale: getLangFromLocaleId(originLocalization.locale.id) };

  return { graphics, internal, audio, debug, localization };
}
