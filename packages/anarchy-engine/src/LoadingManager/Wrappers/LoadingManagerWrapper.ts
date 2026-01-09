import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerParams, TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager/Models';
import { LoadingManager } from 'three';

export function LoadingManagerWrapper(params: TLoadingManagerParams): TLoadingManagerWrapper {
  const entity: LoadingManager = new LoadingManager(params.onLoad, params.onProgress, params.onError);

  const wrapper: TAbstractWrapper<LoadingManager> = AbstractWrapper(entity, WrapperType.LoadingManager, params);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, { entity });
}
