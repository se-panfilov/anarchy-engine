import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParams } from '@Engine/Renderer/Adapters';
import type { TRendererFactory, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@Engine/Renderer/Models';
import { RendererWrapper } from '@Engine/Renderer/Wrappers';

export function RendererFactory(): TRendererFactory {
  const factory: TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies> = ReactiveFactory(FactoryType.Renderer, RendererWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
