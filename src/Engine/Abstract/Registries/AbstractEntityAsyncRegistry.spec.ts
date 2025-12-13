import { describe } from 'vitest';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import { createMockEntity, validateEntityAsyncRegistryReturnsOriginalObjects } from '@/Engine/Abstract/Registries/ValidateRegistryOriginalsTestSuite';
import type { TRegistrable } from '@/Engine/Mixins';

import { AbstractEntityAsyncRegistry } from './AbstractEntityAsyncRegistry';

describe('AbstractEntityAsyncRegistry', () => {
  const registry: TAbstractAsyncRegistry<TRegistrable> = AbstractEntityAsyncRegistry('MockEntityAsyncRegistry' as RegistryType);
  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateEntityAsyncRegistryReturnsOriginalObjects<TRegistrable>(registry, createMockEntity);
  });
});
