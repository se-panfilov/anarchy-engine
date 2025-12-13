import { getHumanReadableMemorySize } from '@/Engine';

export function getMemoryUsage(): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
  return getHumanReadableMemorySize((window as any).performance.memory.usedJSHeapSize);
}
