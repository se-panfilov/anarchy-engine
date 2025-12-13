import type { TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';
import type { TActorConfig } from '@Anarchy/Engine/Actor';
import type { TAnyAudioConfig, TAudioResourceConfig } from '@Anarchy/Engine/Audio';
import type { TAnyCameraConfig } from '@Anarchy/Engine/Camera';
import type { TControlsConfig } from '@Anarchy/Engine/Controls';
import type { TAnyIntersectionsWatcherConfig } from '@Anarchy/Engine/Intersections';
import { isIntersectionsCameraWatcherConfig } from '@Anarchy/Engine/Intersections';
import type { TActive, TWithName, TWithNameOptional, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TModel3dConfig, TModel3dResourceConfig } from '@Anarchy/Engine/Models3d';
import type { TPhysicsBodyConfig, TPhysicsConfig } from '@Anarchy/Engine/Physics';
import type { TSceneConfig } from '@Anarchy/Engine/Scene/Models';
import { SpaceSchemaVersion } from '@Anarchy/Engine/Space/Constants';
import type { TSpaceConfig, TSpaceConfigEntities, TSpaceConfigResources } from '@Anarchy/Engine/Space/Models';
import {
  validate,
  validateActorNamesForEveryEntity,
  validateAllActorsHasModel3d,
  validateAllActorsWithPhysicsHasRelatedPhysicsBody,
  validateAllAudioEntityHasValidResource,
  validateAllModel3dEntityHasValidResource,
  validateCameraNames,
  validateFileUrls,
  validateModel3dFileUrls,
  validateNames,
  validateNoSameName,
  validateTags,
  validateTagsForEveryEntity
} from '@Anarchy/Engine/Space/Utils';
import { validateTSpaceConfig } from '@Anarchy/Engine/Space/Validators/Validators.gen';
import { isDefined } from '@Anarchy/Shared/Utils';
import { isArray } from 'lodash-es';

type TSchemaValidationResult = Readonly<{ isValid: boolean; errors: ReadonlyArray<any> | null | undefined }>;

export function validSpaceConfig(config: TSpaceConfig): TSchemaValidationResult {
  const jsonResult = validateJsonSchema(config);
  const dataResult = validateData(config);
  const jsonErrors: ReadonlyArray<any> = jsonResult.errors ?? [];
  const dataErrors: ReadonlyArray<any> = dataResult.errors ?? [];

  return { isValid: jsonResult.isValid && dataResult.isValid, errors: [...jsonErrors, ...dataErrors] };
}

function validateJsonSchema(config: TSpaceConfig): TSchemaValidationResult {
  const isValid: boolean = validateTSpaceConfig(config);
  return { isValid, errors: (validateTSpaceConfig as any).errors };
}

function validateData({ name, version, scenes, resources, entities, canvasSelector, tags }: TSpaceConfig): TSchemaValidationResult {
  const { models3d: models3dResources, audio: audioResources, envMaps, textures } = resources;
  const { actors, audio, cameras, spatialGrids, controls, intersections, lights, materials, models3d: models3dEntities, physics, fogs, texts } = entities;

  const basicErrors: ReadonlyArray<string> = validateConfigBasics(name, version, scenes, canvasSelector, tags);
  const activeErrors: ReadonlyArray<string> = validateActiveEntities({ cameras, scenes, controls });
  const relationsErrors: ReadonlyArray<string> = validateRelations(controls, cameras, actors, models3dEntities, models3dResources, audioResources, audio, intersections, physics);
  const namesErrors: ReadonlyArray<string> = validateEntityNames({
    scenes,
    spatialGrids,
    actors,
    cameras,
    intersections,
    lights,
    fogs,
    texts,
    controls,
    models3dResources,
    materials,
    envMaps,
    textures
  });
  const tagsErrors: ReadonlyArray<string> = validateEntityTags({
    scenes,
    spatialGrids,
    actors,
    cameras,
    intersections,
    lights,
    fogs,
    texts,
    controls,
    models3dResources,
    materials,
    envMaps,
    textures
  });
  const duplicationErrors: ReadonlyArray<string> = validateNamesDuplication(entities, resources);
  const urlsErrors: ReadonlyArray<string> = validateUrls({ models3dResources }, { envMaps, textures });

  const errors: ReadonlyArray<string> = [...basicErrors, ...activeErrors, ...relationsErrors, ...namesErrors, ...tagsErrors, ...duplicationErrors, ...urlsErrors];

  return { isValid: errors.length === 0, errors };
}

function validateConfigBasics(name: string, version: SpaceSchemaVersion, scenes: ReadonlyArray<TSceneConfig>, canvasSelector: string, tags?: ReadonlyArray<string>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  if (version !== SpaceSchemaVersion.V1) errors = [...errors, `Unsupported schema's version(${version}). Supported version is: ${SpaceSchemaVersion.V2}`];
  if (scenes.length === 0) errors = [...errors, 'No scenes are defined'];
  if (!/^[a-zA-Z0-9\s.#\-_>[\]='"*^$~|(),:]+$/.test(canvasSelector)) errors = [...errors, 'Canvas selector must be defined and contain only allowed characters (a normal css selector)'];
  if (!validateTags(tags)) errors = [...errors, 'Space config tags must contain only letters, numbers and underscores'];
  if (!validate(name)) errors = [...errors, 'Space config name must be defined and contain only letters, numbers and underscores'];

  return errors;
}

function validateActiveEntities(entities: Record<string, ReadonlyArray<TActive>>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  Object.entries(entities).forEach((list): void => {
    const [, key] = Object.entries(list)[0];
    const [, value] = Object.entries(list)[1];

    if ((value as ReadonlyArray<TActive>).filter((v: TActive): boolean => v.isActive).length > 1) errors = [...errors, `Must be only one active entity of "${key}", but multiple are active`];
  });

  return errors;
}

function validateRelations(
  controls: ReadonlyArray<TControlsConfig>,
  cameras: ReadonlyArray<TAnyCameraConfig>,
  actors: ReadonlyArray<TActorConfig>,
  models3dEntities: ReadonlyArray<TModel3dConfig>,
  models3dResources: ReadonlyArray<TModel3dResourceConfig>,
  audioResources: ReadonlyArray<TAudioResourceConfig>,
  audio: ReadonlyArray<TAnyAudioConfig>,
  intersections: ReadonlyArray<TAnyIntersectionsWatcherConfig>,
  physics: TPhysicsConfig
): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  if (controls.length > 0 && cameras.length === 0) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!controls.every((control: TControlsConfig): boolean => cameras.some((camera: TAnyCameraConfig): boolean => camera.name === control.cameraName)))
    errors = [...errors, 'Not every control has a camera'];
  if (!validateAllActorsHasModel3d(actors, models3dEntities)) errors = [...errors, 'Not every actor has a defined model3dSource (check actors model3dSource against models3d entities)'];
  if (!validateAllActorsWithPhysicsHasRelatedPhysicsBody(actors, physics)) errors = [...errors, 'Not every actor has a defined model3dSource (check actors model3dSource against models3d entities)'];
  if (!validateAllModel3dEntityHasValidResource(models3dEntities, models3dResources)) errors = [...errors, 'Not every model3d entity has a valid resource (must be a primitive or an url)'];
  if (!validateAllAudioEntityHasValidResource(audio, audioResources)) errors = [...errors, 'Not every audio entity has a valid resource (must be a primitive or an url)'];
  if (!validateCameraNames(intersections.filter(isIntersectionsCameraWatcherConfig))) errors = [...errors, 'Not every intersection camera name is valid'];
  if (!validateActorNamesForEveryEntity(intersections)) errors = [...errors, 'Not every intersection actor name is valid'];

  return errors;
}

function validateEntityNames(entities: Record<string, ReadonlyArray<TWithNameOptional | TWithName>>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  Object.entries(entities).forEach((list): void => {
    const [, key] = Object.entries(list)[0];
    const [, value] = Object.entries(list)[1];

    const isValid: boolean = validateNames(value as ReadonlyArray<TWithNameOptional | TWithName>);
    if (!isValid) errors = [...errors, `Entity ("${key}") names must be defined and contain only letters, numbers and underscores`];
  });

  return errors;
}

function validateEntityTags(entities: Record<string, ReadonlyArray<TWithTags>>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  Object.entries(entities).forEach((list): void => {
    const [, key] = Object.entries(list)[0];
    const [, value] = Object.entries(list)[1];

    const isValid: boolean = validateTagsForEveryEntity(value as ReadonlyArray<Record<string, TWithTags>>);
    if (!isValid) errors = [...errors, `Entity ("${key}") tags must contain only letters, numbers and underscores`];
  });

  return errors;
}

function validateNamesDuplication(entities: TSpaceConfigEntities, resources: TSpaceConfigResources): ReadonlyArray<string> {
  const bodies: ReadonlyArray<TPhysicsBodyConfig> = entities.physics?.bodies ?? [];

  return [
    //"physics" is not an array, but we could check the bodies
    ...Object.values(entities).filter(isArray).map(validateNoSameName),
    validateNoSameName(bodies),
    ...Object.values(resources).map(validateNoSameName)
  ].filter(isDefined);
}

function validateUrls(models3dResources: Record<string, ReadonlyArray<TModel3dResourceConfig>>, withFileUrls: Record<string, ReadonlyArray<TAbstractResourceConfig>>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  Object.entries(models3dResources).forEach((configs): void => {
    const [, key] = Object.entries(configs)[0];
    const [, value] = Object.entries(configs)[1];
    const isValid: boolean = validateModel3dFileUrls(value as ReadonlyArray<TModel3dResourceConfig>);
    if (!isValid) errors = [...errors, `Entity ("${key}") URLs must contain only letters, numbers and underscores`];
  });

  Object.entries(withFileUrls).forEach((configs): void => {
    const [, key] = Object.entries(configs)[0];
    const [, value] = Object.entries(configs)[1];
    const isValid: boolean = validateFileUrls(value as ReadonlyArray<TAbstractResourceConfig>);
    if (!isValid) errors = [...errors, `Entity ("${key}") URLs must contain only letters, numbers and underscores`];
  });

  return errors;
}
