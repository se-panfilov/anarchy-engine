import { describe } from 'vitest';

import type { RegistryType } from '@/Abstract/Constants';
import type { TAbstractAsyncEntityRegistry } from '@/Abstract/Models';
import { createMockEntity, validateEntityAsyncRegistryReturnsOriginalObjects } from '@/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Mixins';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityAsyncRegistry', () => {
  const registry: TAbstractAsyncEntityRegistry<TRegistrable> = AbstractEntityAsyncRegistry('MockEntityAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
