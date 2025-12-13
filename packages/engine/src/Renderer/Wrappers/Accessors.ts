import type { WebGLRenderer } from 'three';

import { withThreeJsRendererParamsAccessors, withThreeJsRendererPropsAccessors } from '@/Renderer/Mixins';
import type { TRendererAccessors } from '@/Renderer/Models';

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
