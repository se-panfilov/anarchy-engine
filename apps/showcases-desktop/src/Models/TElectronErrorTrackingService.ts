import type { TTrackingService } from '@hellpig/anarchy-tracking';

export type TElectronErrorTrackingService = Readonly<{
  start: (packagesVersions: Record<string, string>) => TTrackingService | undefined;
}>;
