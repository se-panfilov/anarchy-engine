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
  let lastLoaded: number = 0;
  let lastTotal: number = 0;

  const onProgress = (url: string, loaded: number, total: number): void => {
    setLastCounters(loaded, total);
    progress$.next({ type: PROGRESS, url, loaded, total, progress: getProgress(loaded, total) });
    params.onProgress?.(url, loaded, total);
  };

  const onLoad = (): void => {
    const loaded: number = lastTotal > 0 ? lastTotal : lastLoaded;
    const total: number = lastTotal;
    progress$.next({ type: DONE, loaded, total, progress: getProgress(loaded, total) });
    ready$.next(true);
    params.onLoad?.();
  };

  const onError = (url: string): void => {
    progress$.next({ type: ERROR, url, loaded: lastLoaded, total: lastTotal, progress: getProgress(lastLoaded, lastTotal) });
    ready$.next(true);
    params.onError?.(url);
  };

  const entity: LoadingManager = new LoadingManager(onLoad, onProgress, onError);
  const progress$: BehaviorSubject<TLoadingEvent> = new BehaviorSubject<TLoadingEvent>({ type: NOT_STARTED, loaded: 0, total: 0, progress: 0 });
  const ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  function getProgress(loaded: number, total: number): number {
    if (total <= 0) return 0;

    const percentRaw: number = (loaded / total) * 100;
    if (!Number.isFinite(percentRaw)) return 0;

    const percentClamped: number = Math.max(0, Math.min(100, percentRaw));

    return Number(percentClamped.toFixed(2));
  }

  function setLastCounters(loaded: number, total: number): void {
    lastLoaded = loaded;
    lastTotal = total;
  }

  // eslint-disable-next-line functional/immutable-data
  entity.onStart = (url: string, loaded: number, total: number): void => {
    setLastCounters(loaded, total);
    progress$.next({ type: START, url, loaded, total, progress: getProgress(loaded, total) });
    ready$.next(false);
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
      progress$.next({ type: ERROR, url: label, loaded: lastLoaded, total: lastTotal, progress: getProgress(lastLoaded, lastTotal) });
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
    progress$.complete();
    ready$.complete();
    destroySub$.unsubscribe();
    // eslint-disable-next-line functional/immutable-data
    entity.onLoad = (): null => null;
    // eslint-disable-next-line functional/immutable-data
    entity.onProgress = (): null => null;
    // eslint-disable-next-line functional/immutable-data
    entity.onError = (): null => null;
  });

  waitFontsLoading();

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(wrapper, {
    entity,
    progress$,
    ready$,
    waitFontsLoading,
    waitLoading
  });
}
