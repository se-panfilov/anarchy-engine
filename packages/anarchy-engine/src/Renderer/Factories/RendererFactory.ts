import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { rendererConfigToParams } from '@hellpig/anarchy-engine/Renderer/Adapters';
import type { TRendererFactory, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@hellpig/anarchy-engine/Renderer/Models';
import { RendererWrapper } from '@hellpig/anarchy-engine/Renderer/Wrappers';

export function RendererFactory(): TRendererFactory {
  const factory: TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies> = ReactiveFactory(FactoryType.Renderer, RendererWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: rendererConfigToParams });
}
