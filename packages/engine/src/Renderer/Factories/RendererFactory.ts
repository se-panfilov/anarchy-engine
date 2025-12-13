import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Renderer/Adapters';
import type { TRendererFactory, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@/Renderer/Models';
import { RendererWrapper } from '@/Renderer/Wrappers';

export function RendererFactory(): TRendererFactory {
  const factory: TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies> = ReactiveFactory(FactoryType.Renderer, RendererWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
