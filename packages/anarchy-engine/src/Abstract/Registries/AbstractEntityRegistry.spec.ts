import type { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { createMockEntity, validateEntityRegistryReturnsOriginalObjects } from '@hellpig/anarchy-engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@hellpig/anarchy-engine/Mixins';
import { describe } from 'vitest';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityRegistry', () => {
  const registry = AbstractEntityAsyncRegistry('MockEntityRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
