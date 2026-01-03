import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerFactory } from '@Anarchy/Engine/Loading/Models';
import { LoadingManagerWrapper } from '@Anarchy/Engine/Loading/Wrappers';

export function LoadingManagerFactory(): TLoadingManagerFactory {
  return ReactiveFactory(FactoryType.LoadingManager, LoadingManagerWrapper);
}
