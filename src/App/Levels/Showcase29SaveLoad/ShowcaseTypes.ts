import type { BehaviorSubject, Subscription } from 'rxjs';

import type { TSpace, TSpaceConfig } from '@/Engine';

export type TSpacesData = Readonly<{
  name: string;
  config: TSpaceConfig;
  container: string;
  onCreate?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void;
  onSpaceReady?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void;
  onChange?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void;
  onUnload?: (space: TSpace, subscriptions?: Record<string, Subscription>) => void;
  awaits$: BehaviorSubject<ReadonlySet<string>>;
}>;
