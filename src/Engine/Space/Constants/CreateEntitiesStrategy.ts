import type { TCreateEntitiesStrategy } from '@/Engine/Space/Models';

export const CreateEntitiesStrategy = {
  Configs: {
    fsm: 'createSourceFromConfig',
    spatialGrids: 'createFromConfig',
    fogs: 'createFromConfig',
    envMaps: 'createFromConfig',
    models3d: 'createFromConfig',
    audio: 'createFromConfig',
    physicsPresets: 'addPresetsFromConfig',
    cameras: 'createFromConfig',
    actors: 'createFromConfig',
    texts: 'createFromConfig',
    controls: 'createFromConfig',
    lights: 'createFromConfig',
    particles: 'createFromConfig',
    intersections: 'createFromConfig'
  } satisfies TCreateEntitiesStrategy,

  Params: {
    fsm: 'createSourceFromList',
    spatialGrids: 'createFromList',
    fogs: 'createFromList',
    envMaps: 'createFromList',
    models3d: 'createFromList',
    audio: 'createFromList',
    physicsPresets: 'addPresets',
    cameras: 'createFromList',
    actors: 'createFromList',
    texts: 'createFromList',
    controls: 'createFromList',
    lights: 'createFromList',
    particles: 'createFromList',
    intersections: 'createFromList'
  } satisfies TCreateEntitiesStrategy
};
