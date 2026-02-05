import type { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TAbstractAsyncEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Models';
import { createMockEntity, validateEntityAsyncRegistryReturnsOriginalObjects } from '@hellpig/anarchy-engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@hellpig/anarchy-engine/Mixins';
import { describe } from 'vitest';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityAsyncRegistry', () => {
  const registry: TAbstractAsyncEntityRegistry<TRegistrable> = AbstractEntityAsyncRegistry('MockEntityAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
