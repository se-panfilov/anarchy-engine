import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TRendererConfig } from './TRendererConfig';
import type { TRendererParams } from './TRendererParams';
import type { TRendererServiceDependencies } from './TRendererServiceDependencies';
import type { TRendererWrapper } from './TRendererWrapper';
import type { TRendererWrapperDependencies } from './TRendererWrapperDependencies';

export type TRendererFactory = TReactiveFactory<TRendererWrapper, TRendererParams, TRendererWrapperDependencies> &
  TParamsFromConfigWithDependencies<TRendererConfig, TRendererParams, TRendererServiceDependencies>;
