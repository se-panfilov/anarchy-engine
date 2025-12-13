import { beforeAll, describe } from 'vitest';

import type { TActor, TActorConfigToParamsDependencies, TActorParams, TActorService } from '@/Engine/Actor';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TAppCanvas } from '@/Engine/App';
import type { TSpace, TSpaceConfigEntities, TSpaceConfigResources, TSpaceService } from '@/Engine/Space';
import { SpaceFactory, SpaceRegistry, SpaceService } from '@/Engine/Space';
import type { TWriteable } from '@/Engine/Utils';
import { getMockCanvas } from '@/Tests/Mocks/GetMockCanvas';
import { mockActorConfig } from '@/Tests/Mocks/MockActorConfig';
import { mockMaterialConfig } from '@/Tests/Mocks/MockMaterialConfig';
import { mockModel3dConfig } from '@/Tests/Mocks/MockModel3dConfig';
import { mockConfig } from '@/Tests/Mocks/MockSpaceConfig';
import { validateCommonServiceBehavior } from '@/Tests/Suits/ValidateServiceOriginalsTestSuite';

async function getServiceAndParams(
  spaceService: TSpaceService,
  canvas: TAppCanvas
): Promise<{
  service: TActorService;
  params: TActorParams;
}> {
  // eslint-disable-next-line functional/immutable-data
  (mockConfig.resources as TWriteable<TSpaceConfigResources>).materials = [mockMaterialConfig];
  // eslint-disable-next-line functional/immutable-data
  (mockConfig.entities as TWriteable<TSpaceConfigEntities>).models3d = [mockModel3dConfig];
  const spaces: ReadonlyArray<TSpace> = spaceService.createFromConfig([mockConfig]);
  const space: TSpace = spaces[0];
  const dependencies: TActorConfigToParamsDependencies = {
    models3dService: space.services.models3dService,
    fsmService: space.services.fsmService,
    spatialGridRegistry: space.services.spatialGridService.getRegistry()
  };

  return { service: space.services.actorService, params: configToParams(mockActorConfig, dependencies) };
}

describe('ActorServiceOriginals', () => {
  let spaceService: TSpaceService;
  let canvas: TAppCanvas;

  beforeAll(() => {
    spaceService = SpaceService(SpaceFactory(), SpaceRegistry());
    canvas = getMockCanvas();
  });

  describe('Make sure that the registry operates with original object, not copies ', async () => {
    validateCommonServiceBehavior<TActor, TActorParams>(() => getServiceAndParams(spaceService, canvas));
  });
});
