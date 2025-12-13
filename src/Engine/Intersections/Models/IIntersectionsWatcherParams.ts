import type { Observable } from 'rxjs';

import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IMousePosition } from '@/Engine/Mouse';

export type IIntersectionsWatcherParams = Readonly<{
  position$: Observable<IMousePosition>;
}> &
  IWithReadonlyTags;
