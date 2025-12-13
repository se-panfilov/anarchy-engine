import type { TSpaceLoops, TSpaceServices } from '@Anarchy/Engine/Space';
import type { SpaceEvents } from '@Anarchy/Engine/Space/Constants';

import type { TSpaceCanvas } from './TSpaceCanvas';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceParams } from './TSpaceParams';

export type TAfterAllServicesInitializedSpaceEvent = Readonly<{
  name: SpaceEvents.AfterAllServicesInitialized;
  args: { canvas: TSpaceCanvas; services: TSpaceServices; loops: TSpaceLoops; params: TSpaceParams };
}>;
export type TAfterEntitiesCreatedSpaceEvent = Readonly<{
  name: SpaceEvents.AfterEntitiesCreated;
  args: { services: TSpaceServices; loops: TSpaceLoops; params?: TSpaceParams; config?: TSpaceConfig };
}>;
export type TBeforeBaseServicesBuiltSpaceEvent = Readonly<{ name: SpaceEvents.BeforeBaseServicesBuilt; args: { canvas: TSpaceCanvas; params: TSpaceParams } }>;
export type TBeforeEntitiesCreatedSpaceEvent = Readonly<{
  name: SpaceEvents.BeforeEntitiesCreated;
  args: { services: TSpaceServices; loops: TSpaceLoops; params?: TSpaceParams; config?: TSpaceConfig };
}>;
export type TBeforeEntitiesServicesBuiltSpaceEvent = Readonly<{ name: SpaceEvents.BeforeEntitiesServicesBuilt; args: { canvas: TSpaceCanvas; params: TSpaceParams } }>;
export type TBeforeLoopsCreatedSpaceEvent = Readonly<{ name: SpaceEvents.BeforeLoopsCreated; args: { params: TSpaceParams } }>;
export type TBeforeResourcesLoadedSpaceEvent = Readonly<{ name: SpaceEvents.BeforeResourcesLoaded; args: { config: TSpaceConfig; services: TSpaceServices; loops: TSpaceLoops } }>;

export type TSpaceAnyEvent =
  | TAfterAllServicesInitializedSpaceEvent
  | TAfterEntitiesCreatedSpaceEvent
  | TBeforeBaseServicesBuiltSpaceEvent
  | TBeforeEntitiesCreatedSpaceEvent
  | TBeforeEntitiesServicesBuiltSpaceEvent
  | TBeforeLoopsCreatedSpaceEvent
  | TBeforeResourcesLoadedSpaceEvent;
