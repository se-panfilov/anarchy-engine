import { getHumanReadableMemorySize } from '@Shared/Utils';

export function getMemoryUsage(): string {
  return getHumanReadableMemorySize((window as any).performance.memory.usedJSHeapSize);
}
