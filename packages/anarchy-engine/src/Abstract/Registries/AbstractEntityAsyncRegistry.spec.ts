import type { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import type { TAbstractAsyncEntityRegistry } from '@Anarchy/Engine/Abstract/Models';
import { createMockEntity, validateEntityAsyncRegistryReturnsOriginalObjects } from '@Anarchy/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@Anarchy/Engine/Mixins';
import { describe } from 'vitest';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityAsyncRegistry', () => {
  const registry: TAbstractAsyncEntityRegistry<TRegistrable> = AbstractEntityAsyncRegistry('MockEntityAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
