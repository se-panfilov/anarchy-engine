import { describe } from 'vitest';

import type { RegistryType } from '@/Abstract/Constants';
import { createMockEntity, validateEntityRegistryReturnsOriginalObjects } from '@/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Mixins';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityRegistry', () => {
  const registry = AbstractEntityAsyncRegistry('MockEntityRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
