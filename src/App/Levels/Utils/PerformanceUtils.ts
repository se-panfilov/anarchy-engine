import { getHumanReadableMemorySize } from '@/Engine';

export function getMemoryUsage(): string {
  return getHumanReadableMemorySize((window as any).performance.memory.usedJSHeapSize);
}
