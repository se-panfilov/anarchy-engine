import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import type { IRendererWrapper } from '@/Engine/Renderer';

export type ISpaceRenderer = {
  text2dRenderer?: IText2dRenderer;
  text3dRenderer?: IText3dRenderer;
  renderer?: IRendererWrapper;
};
