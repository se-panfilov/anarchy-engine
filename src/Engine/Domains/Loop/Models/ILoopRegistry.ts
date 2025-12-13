import type { IAbstractRegistry } from '@Engine/Domains/Abstract';

import type { ILoopWrapper } from '@/Engine/Domains/Loop/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type ILoopRegistry = IProtectedRegistry<ILoopWrapper, IAbstractRegistry<ILoopWrapper>>;
