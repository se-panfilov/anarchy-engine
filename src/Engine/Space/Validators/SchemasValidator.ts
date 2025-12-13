import Ajv from 'ajv';

import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TActorConfig } from '@/Engine/Actor';
import type { TAnyAudioConfig, TAudioResourceConfig } from '@/Engine/Audio';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { TActive, TWithName, TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dResourceConfig } from '@/Engine/Models3d';
import { isPrimitiveModel3dResourceConfig, isPrimitiveModel3dSource } from '@/Engine/Models3d';
import type { TPhysicsConfig, TPhysicsPresetConfig, TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSceneConfig } from '@/Engine/Scene/Models';
import { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { TSpaceConfig } from '@/Engine/Space/Models';
import TSpaceConfigSchema from '@/Engine/Space/Schemas/TSpaceConfig.json';
import { isDefined, isNotDefined } from '@/Engine/Utils';

const ajv: Ajv = new Ajv();

type TSchemaValidationResult = Readonly<{ isValid: boolean; errors: ReadonlyArray<any> | null | undefined }>;

export function validSpaceConfig(config: TSpaceConfig): TSchemaValidationResult {
  const jsonResult = validateJsonSchema(config);
  const dataResult = validateData(config);
  const jsonErrors: ReadonlyArray<any> = jsonResult.errors ?? [];
  const dataErrors: ReadonlyArray<any> = dataResult.errors ?? [];

  return { isValid: jsonResult.isValid && dataResult.isValid, errors: [...jsonErrors, ...dataErrors] };
}

function validateJsonSchema(config: TSpaceConfig): TSchemaValidationResult {
  const validate = ajv.compile(TSpaceConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}

function validateData({ name, version, scenes, resources, entities, canvasSelector, tags }: TSpaceConfig): TSchemaValidationResult {
  const { models3d: models3dResources, audio: audioResources, envMaps, materials, textures } = resources;
  const { actors, audio, cameras, spatialGrids, controls, intersections, lights, models3d: models3dEntities, fogs, texts, physics } = entities;

  const basicErrors: ReadonlyArray<string> = validateConfigBasics(name, version, scenes, canvasSelector, tags);
  const activeErrors: ReadonlyArray<string> = validateActiveEntities({ cameras, scenes, controls });
  const relationsErrors: ReadonlyArray<string> = validateRelations(controls, cameras, actors, physics, models3dEntities, models3dResources, audioResources, audio, intersections);
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
  const urlsErrors: ReadonlyArray<string> = validateUrls({ models3dResources }, { envMaps, textures });

  const errors: ReadonlyArray<string> = [...basicErrors, ...activeErrors, ...relationsErrors, ...namesErrors, ...tagsErrors, ...urlsErrors];

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
  cameras: ReadonlyArray<TCameraConfig>,
  actors: ReadonlyArray<TActorConfig>,
  physics: TPhysicsConfig,
  models3dEntities: ReadonlyArray<TModel3dConfig>,
  models3dResources: ReadonlyArray<TModel3dResourceConfig>,
  audioResources: ReadonlyArray<TAudioResourceConfig>,
  audio: ReadonlyArray<TAnyAudioConfig>,
  intersections: ReadonlyArray<TIntersectionsWatcherConfig>
): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  if (controls.length > 0 && cameras.length === 0) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!controls.every((control: TControlsConfig): boolean => cameras.some((camera: TCameraConfig): boolean => camera.name === control.cameraName)))
    errors = [...errors, 'Not every control has a camera'];
  if (!validateAllActorsHasPhysicsPreset(actors, physics.presets)) errors = [...errors, 'Not every actor has a defined physics preset (check actors presetName against physics presets names)'];
  if (!validateAllActorsHasModel3d(actors, models3dEntities)) errors = [...errors, 'Not every actor has a defined model3dSource (check actors model3dSource against models3d entities)'];
  if (!validateAllModel3dEntityHasValidResource(models3dEntities, models3dResources)) errors = [...errors, 'Not every model3d entity has a valid resource (must be a primitive or an url)'];
  if (!validateAllAudioEntityHasValidResource(audio, audioResources)) errors = [...errors, 'Not every audio entity has a valid resource (must be a primitive or an url)'];
  if (!validateCameraNames(intersections)) errors = [...errors, 'Not every intersection camera name is valid'];
  if (!validateActorNamesForEveryEntity(intersections)) errors = [...errors, 'Not every intersection actor name is valid'];
  if (!validatePresetNames(actors)) errors = [...errors, 'Not every actor has a valid physics preset name'];

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

function validateUrls(models3dResources: Record<string, ReadonlyArray<TModel3dResourceConfig>>, withFileUrls: Record<string, ReadonlyArray<TAbstractResourceConfig>>): ReadonlyArray<string> {
  let errors: ReadonlyArray<string> = [];

  Object.entries(models3dResources).forEach((configs): void => {
    const [, key] = Object.entries(configs)[0];
    const [, value] = Object.entries(configs)[1];
    const isValid: boolean = validateModel3dFileUrls(value as ReadonlyArray<TModel3dResourceConfig>);
    if (!isValid) errors = [...errors, `Entity ("${key}") tags must contain only letters, numbers and underscores`];
  });

  Object.entries(withFileUrls).forEach((configs): void => {
    const [, key] = Object.entries(configs)[0];
    const [, value] = Object.entries(configs)[1];
    const isValid: boolean = validateFileUrls(value as ReadonlyArray<TAbstractResourceConfig>);
    if (!isValid) errors = [...errors, `Entity ("${key}") tags must contain only letters, numbers and underscores`];
  });

  return errors;
}

const validateNames = (entities: ReadonlyArray<TWithNameOptional>): boolean => entities.every(validateName);
const validateName = (entity: TWithNameOptional): boolean => validateField(entity, 'name');
const validateCameraNames = (
  entities: ReadonlyArray<
    Readonly<{
      cameraName: string;
    }>
  >
): boolean => entities.every(validateCameraName);
const validateCameraName = (entity: Readonly<{ cameraName: string }>): boolean => validateField(entity, 'cameraName');
const validatePresetName = (entity: Readonly<{ presetName: string }>): boolean => validateField(entity, 'presetName');

function validatePresetNames(
  entities: ReadonlyArray<
    Readonly<{
      physics?: TWithPresetNamePhysicsBodyConfig;
    }>
  >
): boolean {
  return entities
    .map((entity) => entity.physics)
    .filter(isDefined)
    .every((physics) => isNotDefined(physics.presetName) || validatePresetName(physics as any));
}

const validateActorNamesForEveryEntity = (
  entities: ReadonlyArray<
    Readonly<{
      actorNames: ReadonlyArray<string>;
    }>
  >
): boolean => entities.every(validateActorNames);
const validateActorNames = (
  entity: Readonly<{
    actorNames: ReadonlyArray<string>;
  }>
): boolean => validateArrayField(entity, 'actorNames');

const validateTagsForEveryEntity = (entities: ReadonlyArray<TWithTags>): boolean => entities.every((e: TWithTags): boolean => validateTags(e.tags));
const validateTags = (tags: ReadonlyArray<string> | undefined): boolean => (tags ? tags.every(validate) : true);

const validateField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => validate(obj[field]);
const validateArrayField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => obj[field].every(validate);

const validate = (str: string | undefined): boolean => (isDefined(str) ? str.length > 0 && /^[A-z0-9_]+$/gm.test(str) : true);

function validateAllActorsHasPhysicsPreset(actors: ReadonlyArray<TActorConfig>, presets: ReadonlyArray<TPhysicsPresetConfig> | undefined): boolean {
  return actors.every((actor: TActorConfig) => {
    if (isNotDefined(presets)) return true;
    return presets.some((preset: TPhysicsPresetConfig): boolean => isNotDefined(actor.physics) || isNotDefined(actor.physics?.presetName) || preset.name === actor.physics.presetName);
  });
}

function validateAllActorsHasModel3d(actors: ReadonlyArray<TActorConfig>, models3d: ReadonlyArray<TModel3dConfig> | undefined): boolean {
  const sources: ReadonlyArray<string> = models3d?.map((v: TModel3dConfig): string => v.name) ?? [];
  return actors.every((actor: TActorConfig): boolean => (isNotDefined(models3d) ? true : sources.includes(actor.model3dSource)));
}

// TODO would be nice to check all the resources and relations (e.g. materials)
function validateAllModel3dEntityHasValidResource(entities: ReadonlyArray<TModel3dConfig>, resources: ReadonlyArray<TModel3dResourceConfig>): boolean {
  return entities.every((entity: TModel3dConfig): boolean => {
    if (isPrimitiveModel3dSource(entity.model3dSource)) return true;
    return resources.some((resource: TModel3dResourceConfig): boolean => resource.name === entity.model3dSource);
  });
}

function validateAllAudioEntityHasValidResource(entities: ReadonlyArray<TAnyAudioConfig>, resources: ReadonlyArray<TAudioResourceConfig>): boolean {
  return entities.every((entity: TAnyAudioConfig): boolean => {
    return resources.some((resource: TAudioResourceConfig): boolean => resource.name === entity.audioSource);
  });
}

function validateModel3dFileUrls(configs: ReadonlyArray<TModel3dResourceConfig>): boolean {
  return configs.every((config: TModel3dResourceConfig): boolean => {
    if (isPrimitiveModel3dResourceConfig(config)) return true;
    return validateFileUrl(config.url);
  });
}

function validateFileUrls(configs: ReadonlyArray<TAbstractResourceConfig>): boolean {
  return configs.every(({ url }: TAbstractResourceConfig): boolean => validateFileUrl(url));
}

function validateFileUrl(url: string): boolean {
  const regex = /^(\/|[a-zA-Z]:\\)[a-zA-Z0-9_\-/\\]+\.([A-z0-9]{1,4})$/;
  return regex.test(url);
}
