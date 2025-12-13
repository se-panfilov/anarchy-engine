import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IRendererWrapper } from '@/Engine/Renderer/Models';

export type IRendererRegistry = IProtectedRegistry<IAbstractRegistry<IRendererWrapper>>;
