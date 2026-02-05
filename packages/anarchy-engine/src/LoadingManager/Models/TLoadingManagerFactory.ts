import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';

import type { TLoadingManagerParams } from './TLoadingManagerParams';
import type { TLoadingManagerWrapper } from './TLoadingManagerWrapper';

export type TLoadingManagerFactory = TReactiveFactory<TLoadingManagerWrapper, TLoadingManagerParams>;
