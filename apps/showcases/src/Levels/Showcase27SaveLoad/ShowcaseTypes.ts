import type { BehaviorSubject, Subscription } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@Engine';

export type TSpacesData = Readonly<{
  name: string;
  config: TSpaceConfig;
  container: string;
  onCreate?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void | Promise<void | never>;
  onSpaceReady?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void | Promise<void | never>;
  onChange?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void | Promise<void | never>;
  onUnload?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void | Promise<void | never>;
  awaits$: BehaviorSubject<ReadonlySet<string>>;
}>;
