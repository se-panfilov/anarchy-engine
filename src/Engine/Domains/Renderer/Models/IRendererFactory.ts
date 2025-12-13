import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IRendererParams } from './IRendererParams';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererFactory = IReactiveFactory<IRendererWrapper, IRendererParams> & IDestroyable;
