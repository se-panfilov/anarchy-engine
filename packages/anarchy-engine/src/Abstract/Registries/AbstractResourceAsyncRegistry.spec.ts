import type { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry } from '@Anarchy/Engine/Abstract/Models';
import { createMockEntity, validateSimpleAsyncRegistryReturnsOriginalObjects } from '@Anarchy/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@Anarchy/Engine/Mixins';
import { describe } from 'vitest';

import { AbstractResourceAsyncRegistry } from './AbstractResourceAsyncRegistry';

describe('AbstractResourceAsyncRegistry', () => {
  const registry: TAbstractResourceAsyncRegistry<TRegistrable> = AbstractResourceAsyncRegistry('MockSimpleAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateSimpleAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
