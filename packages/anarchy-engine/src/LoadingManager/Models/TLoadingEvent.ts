import type { LoadingEventType } from '@Anarchy/Engine/LoadingManager/Constants';

export type TLoadingEvent = Readonly<{
  type: LoadingEventType;
  url?: string;
  loaded: number;
  total: number;
  progress?: number;
}>;
