import type { ColorRepresentation } from 'three';

import type { TColorWrapper } from '@/Engine/Color/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function colorToConfig(entity: TColorWrapper): ColorRepresentation {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  return filterOutEmptyFields({
    // TODO 15-0-0: fix any
  }) as any;
}
