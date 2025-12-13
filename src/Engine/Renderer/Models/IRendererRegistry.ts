import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IRendererWrapper } from '@/Engine/Renderer/Models';

export type IRendererRegistry = IProtectedRegistry<IAbstractEntityRegistry<IRendererWrapper>>;
