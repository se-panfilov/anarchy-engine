import { describe } from 'vitest';

import type { RegistryType } from '@/Abstract/Constants';
import type { TAbstractSimpleRegistry } from '@/Abstract/Models';
import { createMockEntity, validateSimpleRegistryReturnsOriginalObjects } from '@/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Mixins';

import { AbstractSimpleRegistry } from './AbstractSimpleRegistry';

describe('AbstractSimpleRegistry', () => {
  const registry: TAbstractSimpleRegistry<TRegistrable> = AbstractSimpleRegistry('MockRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
