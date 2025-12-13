import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Renderer/Adapters';
import type { TRendererFactory, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@Anarchy/Engine/Renderer/Models';
import { RendererWrapper } from '@Anarchy/Engine/Renderer/Wrappers';

export function RendererFactory(): TRendererFactory {
  const factory: TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies> = ReactiveFactory(FactoryType.Renderer, RendererWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
