import type { TSpace } from '@Anarchy/Engine';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

export function watchResourceLoading(space: TSpace): Subscription {
  return space.services.loadingManagerService
    .getDefault()
    .ready$.pipe(distinctUntilChanged())
    .subscribe((value: boolean): void => {
      // eslint-disable-next-line functional/immutable-data
      (window as any)._isResourcesReady = value;
      (space.container.getElement() as HTMLElement)?.classList[value ? 'add' : 'remove']('-resources-ready');
      if (value) console.log(`[APP][Loading manager]: Resources ready ("${space.name}")`);
    });
}

export function watchActiveRendererReady(space: TSpace): Subscription {
  return space.services.rendererService.getActive().isRendererReady$.subscribe((value: boolean): void => {
    // eslint-disable-next-line functional/immutable-data
    (window as any)._isActiveRendererReady = value;
    (space.container.getElement() as HTMLElement)?.classList[value ? 'add' : 'remove']('-active-renderer-ready');
    console.log(`[APP][Renderer]: renderer is ready ("${space.name}")`);
  });
}

export function watchSceneReady(space: TSpace): ReadonlyArray<Subscription> {
  return [watchResourceLoading(space), watchActiveRendererReady(space)];
}
