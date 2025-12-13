import type { TReactiveFactory } from '@/Engine/Abstract';

import type { TRendererParams } from './TRendererParams';
import type { TRendererWrapper } from './TRendererWrapper';

export type TRendererFactory = TReactiveFactory<TRendererWrapper, TRendererParams>;
