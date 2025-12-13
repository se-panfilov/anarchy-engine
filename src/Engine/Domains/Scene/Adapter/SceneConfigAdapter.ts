import type { ISceneConfig, ISceneParams } from '@/Engine/Domains/Scene/Models';
import { isDefined } from '@/Engine/Utils';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ISceneConfig): ISceneParams {
  return {
    ...config,

    // TODO (S.Panfilov) CWP object3dAdapter//////////
    // TODO (S.Panfilov) debug (wtf layers?)
    // layers: config.layers ? (new Layers()).set(config.layers) : undefined,
    layers: undefined,

    // TODO (S.Panfilov) wtf animations?
    animations: [],

    position: isDefined(config.position) ? Vector3Wrapper(config.position) : undefined,
    rotation: isDefined(config.rotation) ? EulerWrapper(config.rotation) : undefined,
    scale: isDefined(config.scale) ? Vector3Wrapper(config.scale) : undefined
    // TODO (S.Panfilov) End object3dAdapter//////////
  };
}
