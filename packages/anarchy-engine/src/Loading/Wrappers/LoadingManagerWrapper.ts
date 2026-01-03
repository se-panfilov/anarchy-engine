import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import type { TLoadingManager, TLoadingManagerParams, TLoadingManagerWrapper } from '@Anarchy/Engine/Loading/Models';
import { LoadingManager } from 'three';

export function LoadingManagerWrapper(params: TLoadingManagerParams): TLoadingManagerWrapper {
  const entity: TLoadingManager = new LoadingManager(params);

  const wrapper: TAbstractWrapper<TLoadingManager> = AbstractWrapper(entity, WrapperType.LoadingManager, params);

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    entity
  });

  return result;
}
