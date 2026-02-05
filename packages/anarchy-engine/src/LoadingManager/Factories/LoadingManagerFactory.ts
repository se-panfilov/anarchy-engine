import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TLoadingManagerFactory } from '@hellpig/anarchy-engine/LoadingManager/Models';
import { LoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager/Wrappers';

export function LoadingManagerFactory(): TLoadingManagerFactory {
  return ReactiveFactory(FactoryType.LoadingManager, LoadingManagerWrapper);
}
