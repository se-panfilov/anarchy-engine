import { METER } from '@/Engine/Services/DistanceService/Constants';
import type { IDistanceService } from '@/Engine/Services/DistanceService/Models';

export function DistanceService(): IDistanceService {
  function getMeters(amount: number): number {
    return amount * METER;
  }

  return {
    getMeters
  };
}
