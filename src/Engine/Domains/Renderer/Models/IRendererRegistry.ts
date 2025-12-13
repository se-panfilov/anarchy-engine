import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Domains/Mixins';

import type { IRendererWrapper } from '../Models';

export type IRendererRegistry = IProtectedRegistry<IRendererWrapper, IAbstractRegistry<IRendererWrapper>>;
