import type { TAbstractService } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

// eslint-disable-next-line functional/prefer-tacit
export function AbstractService(): TAbstractService {
  return destroyableMixin();
}
