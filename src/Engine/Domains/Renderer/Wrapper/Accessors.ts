import type { WebGLRenderer } from 'three';

import { withThreeJsRendererParamsAccessors, withThreeJsRendererPropsAccessors } from '@/Engine/Domains/Renderer/Mixins';
import type { IRendererAccessors } from '@/Engine/Domains/Renderer/Models';

export function getAccessors(entity: WebGLRenderer): IRendererAccessors {
  return {
    ...withThreeJsRendererParamsAccessors(entity),
    ...withThreeJsRendererPropsAccessors(entity)
  };
}
