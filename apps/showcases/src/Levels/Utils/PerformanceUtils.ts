import { getHumanReadableMemorySize } from '@engine';

export function getMemoryUsage(): string {
  return getHumanReadableMemorySize((window as any).performance.memory.usedJSHeapSize);
}
