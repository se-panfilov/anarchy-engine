import type { LoadingEventType } from '@hellpig/anarchy-engine/LoadingManager/Constants';

export type TLoadingEvent = Readonly<{
  type: LoadingEventType;
  url?: string;
  loaded: number;
  total: number;
  progress?: number;
}>;
