import { getHumanReadableMemorySize } from '@hellpig/anarchy-shared/Utils';

export function getMemoryUsage(): string {
  return getHumanReadableMemorySize((window as any).performance.memory?.usedJSHeapSize);
}
