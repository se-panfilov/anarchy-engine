import type { TTrackingService } from '@hellpig/anarchy-tracking';

export type TWebErrorTrackingService = Readonly<{
  start: () => Promise<TTrackingService | undefined>;
}>;
