import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TRendererFactory } from '@/Engine/Renderer/Models';
import { RendererWrapper } from '@/Engine/Renderer/Wrappers';

export function RendererFactory(): TRendererFactory {
  return ReactiveFactory(FactoryType.Renderer, RendererWrapper);
}
