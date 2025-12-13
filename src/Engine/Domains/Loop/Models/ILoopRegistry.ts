import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Domains/Mixins';

import type { ILoopWrapper } from '@/Engine/Domains/Loop/Models';

export type ILoopRegistry = IProtectedRegistry<ILoopWrapper, IAbstractRegistry<ILoopWrapper>>;
