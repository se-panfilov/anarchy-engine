import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererRegistry = IProtectedRegistry<IAbstractEntityRegistry<IRendererWrapper>>;
