import type { TTrackingService } from '@Anarchy/Tracking';

export type TWebErrorTrackingService = Readonly<{
  start: () => Promise<TTrackingService | undefined>;
}>;
