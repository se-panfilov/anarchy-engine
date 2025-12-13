import type { RegistryType } from '@Engine/Abstract/Constants';
import type { TAbstractSimpleRegistry } from '@Engine/Abstract/Models';
import { createMockEntity, validateSimpleRegistryReturnsOriginalObjects } from '@Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@Engine/Mixins';
import { describe } from 'vitest';

import { AbstractSimpleRegistry } from './AbstractSimpleRegistry';

describe('AbstractSimpleRegistry', () => {
  const registry: TAbstractSimpleRegistry<TRegistrable> = AbstractSimpleRegistry('MockRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
