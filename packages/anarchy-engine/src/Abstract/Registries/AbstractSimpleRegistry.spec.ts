import type { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TAbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract/Models';
import { createMockEntity, validateSimpleRegistryReturnsOriginalObjects } from '@hellpig/anarchy-engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@hellpig/anarchy-engine/Mixins';
import { describe } from 'vitest';

import { AbstractSimpleRegistry } from './AbstractSimpleRegistry';

describe('AbstractSimpleRegistry', () => {
  const registry: TAbstractSimpleRegistry<TRegistrable> = AbstractSimpleRegistry('MockRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
