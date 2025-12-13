import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer/Models';

export type IRendererRegistry = IProtectedRegistry<IRendererWrapper, IAbstractRegistry<IRendererWrapper>>;
