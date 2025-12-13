import { describe } from 'vitest';

import type { RegistryType } from '@/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry } from '@/Abstract/Models';
import { createMockEntity, validateSimpleAsyncRegistryReturnsOriginalObjects } from '@/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Mixins';

import { AbstractResourceAsyncRegistry } from './AbstractResourceAsyncRegistry';

describe('AbstractResourceAsyncRegistry', () => {
  const registry: TAbstractResourceAsyncRegistry<TRegistrable> = AbstractResourceAsyncRegistry('MockSimpleAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
