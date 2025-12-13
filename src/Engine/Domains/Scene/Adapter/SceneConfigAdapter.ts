import type { ISceneConfig, ISceneParams } from '@/Engine/Domains/Scene/Models';

export function getParams(config: ISceneConfig): ISceneParams {
  return { ...config };
}
