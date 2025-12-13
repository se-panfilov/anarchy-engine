import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IRendererParams } from './IRendererParams';
import type { TRendererWrapper } from './TRendererWrapper';

export type IRendererFactory = TReactiveFactory<TRendererWrapper, IRendererParams> & TDestroyable;
