import type { ISceneConfig, ISceneParams } from '../Models';

export function getParams(config: ISceneConfig): ISceneParams {
  return { ...config };
}
