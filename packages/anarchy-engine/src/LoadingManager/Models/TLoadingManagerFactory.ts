import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TLoadingManagerParams } from './TLoadingManagerParams';
import type { TLoadingManagerWrapper } from './TLoadingManagerWrapper';

export type TLoadingManagerFactory = TReactiveFactory<TLoadingManagerWrapper, TLoadingManagerParams>;
