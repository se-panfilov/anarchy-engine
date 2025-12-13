import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TRendererParams } from './TRendererParams';
import type { TRendererWrapper } from './TRendererWrapper';

export type TRendererFactory = TReactiveFactory<TRendererWrapper, TRendererParams> & TDestroyable;
