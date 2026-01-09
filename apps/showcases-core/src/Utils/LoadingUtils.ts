import type { TSpace } from '@Anarchy/Engine';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

export function watchResourceLoading(space: TSpace): Subscription {
  return space.services.loadingManagerService
    .getDefault()
    .ready$.pipe(distinctUntilChanged())
    .subscribe((value: boolean): void => {
      // eslint-disable-next-line functional/immutable-data
      (window as any).isResourcesReady = value;
      (space.container.getElement() as HTMLElement)?.classList[value ? 'add' : 'remove']('-resources-ready');
      if (value) console.log(`[APP][Loading manager]: Resources ready ("${space.name}")`);
    });
}
