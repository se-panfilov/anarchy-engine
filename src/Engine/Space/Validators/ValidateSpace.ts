import type { TSpace, TSpaceRegistry } from '@/Engine/Space/Models';
import { isNotDefined } from '@/Engine/Utils';

export function validateSpacesDoNotUseSameCanvas(registry: TSpaceRegistry, space: TSpace): boolean {
  const duplicates: TSpace | undefined = registry.find((s: TSpace): boolean => Object.is(s.getCanvasElement(), space.getCanvasElement()));
  return isNotDefined(duplicates);
}
