import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Domains/Mixins';

import type { IRendererWrapper } from '@/Engine/Domains/Renderer/Models';

export type IRendererRegistry = IProtectedRegistry<IRendererWrapper, IAbstractRegistry<IRendererWrapper>>;
