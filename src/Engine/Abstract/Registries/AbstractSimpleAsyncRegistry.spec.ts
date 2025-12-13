import { describe } from 'vitest';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry } from '@/Engine/Abstract/Models';
import { createMockEntity, validateSimpleAsyncRegistryReturnsOriginalObjects } from '@/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Engine/Mixins';

import { AbstractSimpleAsyncRegistry } from './AbstractSimpleAsyncRegistry';

describe('AbstractSimpleAsyncRegistry', () => {
  const registry: TAbstractResourceAsyncRegistry<TRegistrable> = AbstractSimpleAsyncRegistry('MockSimpleAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
