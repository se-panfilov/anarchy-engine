import { PlatformActions } from '../Constants';

export function isPlatformAction(type: PlatformActions | string): type is PlatformActions {
  return Object.values(PlatformActions).includes(type as PlatformActions);
}
