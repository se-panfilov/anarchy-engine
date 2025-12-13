export type TCreateEntitiesStrategy = {
  fsm: 'createSourceFromList' | 'createSourceFromConfig';
  spatialGrids: 'createFromList' | 'createFromConfig';
  fogs: 'createFromList' | 'createFromConfig';
  envMaps: 'createFromList' | 'createFromConfig';
  models3d: 'createFromList' | 'createFromConfig';
  audio: 'createFromList' | 'createFromConfig';
  physicsPresets: 'addPresets' | 'addPresetsFromConfig';
  cameras: 'createFromList' | 'createFromConfig';
  actors: 'createFromList' | 'createFromConfig';
  texts: 'createFromList' | 'createFromConfig';
  controls: 'createFromList' | 'createFromConfig';
  lights: 'createFromList' | 'createFromConfig';
  particles: 'createFromList' | 'createFromConfig';
  intersections: 'createFromList' | 'createFromConfig';
};
