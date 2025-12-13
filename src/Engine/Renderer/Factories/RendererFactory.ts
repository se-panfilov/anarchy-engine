import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TRendererFactory, TRendererParams, TRendererWrapper } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrappers';

const create = (params: TRendererParams): TRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);

export function RendererFactory(): TRendererFactory {
  return ReactiveFactory(FactoryType.Renderer, create);
}
