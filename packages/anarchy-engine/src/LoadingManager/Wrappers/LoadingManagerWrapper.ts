import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import { LoadingEventType } from '@Anarchy/Engine/LoadingManager';
import type { TLoadingEvent, TLoadingManagerParams, TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager/Models';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LoadingManager } from 'three';

const { NOT_STARTED, START, PROGRESS, ERROR, DONE } = LoadingEventType;

export function LoadingManagerWrapper(params: TLoadingManagerParams): TLoadingManagerWrapper {
  const onProgress = (url: string, loaded: number, total: number): void => {
    setLastCounters(loaded, total);
    value$.next({ type: PROGRESS, url, loaded, total, progress: getProgress(loaded, total) });
    params.onProgress?.(url, loaded, total);
  };

  const onLoad = (): void => {
    const loaded: number = lastTotal > 0 ? lastTotal : lastLoaded;
    const total: number = lastTotal;
    value$.next({ type: DONE, loaded, total, progress: getProgress(loaded, total) });
    params.onLoad?.();
  };

  const onError = (url: string): void => {
    // Preserve counts up to the error so UI can show partial progress.
    value$.next({ type: ERROR, url, loaded: lastLoaded, total: lastTotal, progress: getProgress(lastLoaded, lastTotal) });
    params.onError?.(url);
  };

  const entity: LoadingManager = new LoadingManager(onLoad, onProgress, onError);
  const value$: BehaviorSubject<TLoadingEvent> = new BehaviorSubject<TLoadingEvent>({ type: NOT_STARTED, loaded: 0, total: 0, progress: 0 });

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
    value$.next({ type: START, url, loaded, total, progress: getProgress(loaded, total) });
  };

  async function waitLoading<T>(label: string, loadingTask: () => Promise<T>): Promise<T> {
    entity.itemStart(label);

    try {
      const res = await loadingTask();
      entity.itemEnd(label);
      return res;
    } catch (e) {
      // Mark as ended (otherwise manager might hang "loading" forever)
      entity.itemError(label);
      entity.itemEnd(label);
      value$.next({ type: ERROR, url: label, loaded: lastLoaded, total: lastTotal, progress: getProgress(lastLoaded, lastTotal) });
      throw e;
    }
  }

  function waitFontsLoading(label = 'fonts:document.fonts.ready'): Promise<void> {
    return waitLoading(label, async (): Promise<void> => {
      const fontsAny: FontFaceSet | undefined = (document as unknown as { fonts?: FontFaceSet }).fonts;
      if (isNotDefined(fontsAny)) return;
      await fontsAny.ready;
    });
  }

  const wrapper: TAbstractWrapper<LoadingManager> = AbstractWrapper(entity, WrapperType.LoadingManager, params);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    value$.complete();
    destroySub$.unsubscribe();
  });

  waitFontsLoading();

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, {
    entity,
    waitLoading,
    waitFontsLoading,
    value$
  });
}
