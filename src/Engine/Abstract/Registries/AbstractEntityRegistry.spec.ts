import { describe } from 'vitest';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import { createMockEntity, validateEntityRegistryReturnsOriginalObjects } from '@/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Engine/Mixins';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityRegistry', () => {
  const registry = AbstractEntityAsyncRegistry('MockEntityRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
