import { withThreeJsRendererParamsAccessors, withThreeJsRendererPropsAccessors } from '@Anarchy/Engine/Renderer/Mixins';
import type { TRendererAccessors } from '@Anarchy/Engine/Renderer/Models';
import type { WebGLRenderer } from 'three';

export function getAccessors(entity: WebGLRenderer): TRendererAccessors {
  const setSize = (width: number, height: number): void => void entity.setSize(width, height);
  const setPixelRatio = (ratio: number, maxPixelRatio: number): void => entity.setPixelRatio(Math.min(ratio, maxPixelRatio));

  return {
    setSize,
    setPixelRatio,
    ...withThreeJsRendererParamsAccessors(entity),
    ...withThreeJsRendererPropsAccessors(entity)
  };
}
