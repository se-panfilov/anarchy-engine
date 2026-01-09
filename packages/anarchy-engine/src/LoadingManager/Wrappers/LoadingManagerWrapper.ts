import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerParams, TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager/Models';
import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoadingManager } from 'three';

export type TLoadingEvent = Readonly<{
  type: 'not started' | 'start' | 'load' | 'error' | 'progress' | 'done';
  url?: string;
  loaded: number;
  total: number;
  progress?: number;
}>;

export function LoadingManagerWrapper(params: TLoadingManagerParams): TLoadingManagerWrapper {
  const entity: LoadingManager = new LoadingManager(params.onLoad, params.onProgress, params.onError);
  const value$: BehaviorSubject<TLoadingEvent> = new BehaviorSubject<TLoadingEvent>({ type: 'not started', loaded: 0, total: 0, progress: 0 });

  let lastLoaded: number = 0;
  let lastTotal: number = 0;

  function getProgress(loaded: number, total: number): number {
    if (total <= 0) return 0;

    const percent: number = (loaded / total) * 100;
    return Number.isFinite(percent) ? Math.max(0, Math.min(100, percent)) : 0;
  }

  function setLastCounters(loaded: number, total: number): void {
    lastLoaded = loaded;
    lastTotal = total;
  }

  // eslint-disable-next-line functional/immutable-data
  entity.onStart = (url: string, loaded: number, total: number): void => {
    setLastCounters(loaded, total);
    value$.next({ type: 'start', url, loaded, total, progress: getProgress(loaded, total) });
  };

  // eslint-disable-next-line functional/immutable-data
  entity.onProgress = (url: string, loaded: number, total: number): void => {
    setLastCounters(loaded, total);
    value$.next({ type: 'progress', url, loaded, total, progress: getProgress(loaded, total) });
  };

  // eslint-disable-next-line functional/immutable-data
  entity.onLoad = (): void => {
    const loaded: number = lastTotal > 0 ? lastTotal : lastLoaded;
    const total: number = lastTotal;
    value$.next({ type: 'done', loaded, total, progress: getProgress(loaded, total) });
  };

  // eslint-disable-next-line functional/immutable-data
  entity.onError = (url: string): void => {
    // Preserve counts up to the error so UI can show partial progress.
    value$.next({ type: 'error', url, loaded: lastLoaded, total: lastTotal, progress: getProgress(lastLoaded, lastTotal) });
  };

  const wrapper: TAbstractWrapper<LoadingManager> = AbstractWrapper(entity, WrapperType.LoadingManager, params);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    value$.complete();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, {
    entity,
    value$
  });
}
