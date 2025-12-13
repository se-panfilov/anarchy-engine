import type { IDestroyable } from '@/Engine/Mixins';

import type { IRendererParams } from './IRendererParams';
import type { IRendererRegistry } from './IRendererRegistry';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererService = Readonly<{
  create: (params: IRendererParams) => IRendererWrapper;
  setActiveRenderer: (rendererId: string) => void;
  findActiveRenderer: (rendererRegistry: IRendererRegistry) => IRendererWrapper | undefined;
}> &
  IDestroyable;
