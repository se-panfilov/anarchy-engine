import type { ISceneConfig } from '@Engine/Launcher/Models';

export function isValidSceneConfig(scene: ISceneConfig | unknown): scene is ISceneConfig {
  return true;
}
