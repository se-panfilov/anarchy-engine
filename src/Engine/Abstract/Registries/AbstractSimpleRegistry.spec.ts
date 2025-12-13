import { describe } from 'vitest';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry } from '@/Engine/Abstract/Models';
import { createMockEntity, validateSimpleRegistryReturnsOriginalObjects } from '@/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Engine/Mixins';

import { AbstractResourceAsyncRegistry } from './AbstractResourceAsyncRegistry';

describe('AbstractSimpleRegistry', () => {
  const registry: TAbstractResourceAsyncRegistry<TRegistrable> = AbstractResourceAsyncRegistry('MockRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
