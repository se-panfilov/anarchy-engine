import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerFactory } from '@Anarchy/Engine/LoadingManager/Models';
import { LoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager/Wrappers';

export function LoadingManagerFactory(): TLoadingManagerFactory {
  return ReactiveFactory(FactoryType.LoadingManager, LoadingManagerWrapper);
}
