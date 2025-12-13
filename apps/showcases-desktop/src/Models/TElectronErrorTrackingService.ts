import type { TTrackingService } from '@Anarchy/Tracking';

export type TElectronErrorTrackingService = Readonly<{
  start: (packagesVersions: Record<string, string>) => TTrackingService | undefined;
}>;
