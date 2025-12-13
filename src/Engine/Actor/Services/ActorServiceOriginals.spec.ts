import { beforeAll, beforeEach, describe } from 'vitest';

import type { TActor, TActorConfigToParamsDependencies, TActorParams, TActorService } from '@/Engine/Actor';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TAppCanvas } from '@/Engine/App';
import type { TSpace, TSpaceService } from '@/Engine/Space';
import { SpaceService } from '@/Engine/Space';
import { getMockCanvas } from '@/Tests/Mocks/GetMockCanvas';
import { mockActorConfig } from '@/Tests/Mocks/MockActorConfig';
import { mockConfig } from '@/Tests/Mocks/MockSpaceConfig';
import { validateCommonServiceBehavior } from '@/Tests/Suits/ValidateServiceOriginalsTestSuite';

describe('ActorServiceOriginals', () => {
  let spaceService: TSpaceService;
  let canvas: TAppCanvas;
  let service: TActorService;
  let dependencies: TActorConfigToParamsDependencies;
  let space: TSpace;

  beforeAll(() => {
    spaceService = SpaceService();
    canvas = getMockCanvas();
  });

  beforeEach(async () => {
    if (!space || !dependencies || !service) {
      space = await spaceService.buildSpaceFromConfig(canvas, mockConfig);
      dependencies = {
        models3dService: space.services.models3dService,
        fsmService: space.services.fsmService,
        spatialGridRegistry: space.services.spatialGridService.getRegistry()
      };
      service = space.services.actorService;
    }
  });

  describe('Make sure that the registry operates with original object, not copies ', () => {
    validateCommonServiceBehavior<TActor, TActorParams>(service, () => configToParams(mockActorConfig, dependencies));
  });
});
