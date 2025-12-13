import type { TReactiveFactory } from '@/Engine/Abstract';

import type { TRendererParams } from './TRendererParams';
import type { TRendererWrapper } from './TRendererWrapper';
import type { TRendererWrapperDependencies } from './TRendererWrapperDependencies';

export type TRendererFactory = TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies>;
