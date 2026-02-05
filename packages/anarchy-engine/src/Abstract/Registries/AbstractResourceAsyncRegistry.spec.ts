import type { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry } from '@hellpig/anarchy-engine/Abstract/Models';
import { createMockEntity, validateSimpleAsyncRegistryReturnsOriginalObjects } from '@hellpig/anarchy-engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@hellpig/anarchy-engine/Mixins';
import { describe } from 'vitest';

import { AbstractResourceAsyncRegistry } from './AbstractResourceAsyncRegistry';

describe('AbstractResourceAsyncRegistry', () => {
  const registry: TAbstractResourceAsyncRegistry<TRegistrable> = AbstractResourceAsyncRegistry('MockSimpleAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
