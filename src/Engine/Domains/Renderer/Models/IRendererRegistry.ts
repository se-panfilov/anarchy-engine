import type { IAbstractRegistry } from '@Engine/Domains/Abstract';

import type { IRendererWrapper } from '@/Engine/Domains/Renderer/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type IRendererRegistry = IProtectedRegistry<IRendererWrapper, IAbstractRegistry<IRendererWrapper>>;
