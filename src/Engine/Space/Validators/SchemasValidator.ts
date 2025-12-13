import Ajv from 'ajv';

import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TModel3dResourceConfig } from '@/Engine/Models3d';
import { isPrimitiveModel3dResourceConfig } from '@/Engine/Models3d';
import type { TPhysicsPresetConfig, TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { isValid: jsonResult.isValid && dataResult.isValid, errors: [...jsonErrors, ...dataErrors] };
}

function validateJsonSchema(config: TSpaceConfig): TSchemaValidationResult {
  const validate = ajv.compile(TSpaceConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}

// TODO This is the worst piece of the code (not generic, hard to support, etc). Refactor.
//  Maybe split resource and entities validation
//  Also extract utils functions to a separate file
function validateData({ name, version, scenes, resources, entities, tags }: TSpaceConfig): TSchemaValidationResult {
  const { models3d, envMaps, materials, textures } = resources;
  const { actors, cameras, spatialGrids, controls, intersections, lights, fogs, texts, physics } = entities;

  let errors: ReadonlyArray<string> = [];

  //validate supported schema's version
  const isSupportedVersion: boolean = version === SpaceSchemaVersion.V2;

  //must be defined
  const isNoScenesDefined: boolean = scenes.length === 0;

  //check active entities
  const isMultipleActiveCameras: boolean = cameras.filter((camera: TCameraConfig) => camera.isActive).length > 1;
  const isMultipleActiveScenes: boolean = scenes.filter((scene: TSceneConfig) => scene.isActive).length > 1;
  const isMultipleActiveControls: boolean = controls.filter((control: TControlsConfig) => control.isActive).length > 1;

  //check relations
  const isControlsWithoutCamera: boolean = controls.length > 0 && cameras.length === 0;
  const isEveryControlsHasCamera: boolean = controls.every((control: TControlsConfig) => cameras.some((camera: TCameraConfig): boolean => camera.name === control.cameraName));

  //check actors' physics presets
  const isAllActorsHasPhysicsPreset = validateAllActorsHasPhysicsPreset(actors, physics.presets);

  //Regexp checks (ts-json schema does not support regexp patterns atm)
  //names
  const isConfigNameValid: boolean = validate(name);
  const isEverySceneNameValid: boolean = validateNames(scenes);
  const isEveryActorNameValid: boolean = validateNames(actors);
  const isEveryCameraNameValid: boolean = validateNames(cameras);
  const isEveryIntersectionNameValid: boolean = validateNames(intersections);
  const isEveryIntersectionCameraNameValid: boolean = validateCameraNames(intersections);
  const isEveryIntersectionActorNamesValid: boolean = validateActorNamesForEveryEntity(intersections);
  const isEveryLightNameValid: boolean = validateNames(lights);
  const isEveryFogNameValid: boolean = validateNames(fogs);
  const isEveryTextNameValid: boolean = validateNames(texts);
  const isEveryControlsNameValid: boolean = validateNames(controls);
  const isEveryPhysicsPresetNameValid: boolean = validateNames(physics.presets ?? []);
  const isEveryActorsPhysicsPresetNameValid: boolean = validatePresetNames(actors);
  const isEverySpatialGridNameValid: boolean = validateNames(spatialGrids);

  //tags
  const isConfigTagsValid: boolean = validateTags(tags);
  const isEverySceneTagsValid: boolean = validateTagsForEveryEntity(scenes);
  const isEverySpatialGridsTagsValid: boolean = validateTagsForEveryEntity(spatialGrids);
  const isEveryActorTagsValid: boolean = validateTagsForEveryEntity(actors);
  const isEveryCameraTagsValid: boolean = validateTagsForEveryEntity(cameras);
  const isEveryIntersectionsTagsValid: boolean = validateTagsForEveryEntity(intersections);
  const isEveryLightTagsValid: boolean = validateTagsForEveryEntity(lights);
  const isEveryFogTagsValid: boolean = validateTagsForEveryEntity(fogs);
  const isEveryTextTagsValid: boolean = validateTagsForEveryEntity(texts);
  const isEveryControlsTagsValid: boolean = validateTagsForEveryEntity(controls);
  const isEveryModels3dTagsValid: boolean = validateTagsForEveryEntity(models3d);
  const isEveryMaterialTagsValid: boolean = validateTagsForEveryEntity(materials);
  const isEveryEnvMapsTagsValid: boolean = validateTagsForEveryEntity(envMaps);
  const isEveryTextureTagsValid: boolean = validateTagsForEveryEntity(textures);

  //urls
  const isEveryModels3dUrlValid: boolean = validateModel3dFileUrls(models3d);
  const isEveryEnvMapsUrlValid: boolean = validateFileUrls(envMaps);
  const isEveryTextureUrlValid: boolean = validateFileUrls(textures);

  //Adding errors
  if (isSupportedVersion) errors = [...errors, `Unsupported schema's version(${version}). Supported version is: ${SpaceSchemaVersion.V2}`];
  if (isNoScenesDefined) errors = [...errors, 'No scenes are defined'];
  if (isMultipleActiveCameras) errors = [...errors, 'Can be only one active camera, but multiple set as active'];
  if (isMultipleActiveScenes) errors = [...errors, 'Can be only one active scene, but multiple set as active'];
  if (isMultipleActiveControls) errors = [...errors, 'Can be only one active control, but multiple set as active'];
  if (isControlsWithoutCamera) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!isEveryControlsHasCamera) errors = [...errors, 'Not every control has a camera'];

  //names
  if (!isConfigNameValid) errors = [...errors, 'Space config name must be defined and contain only letters, numbers and underscores'];
  if (!isEverySceneNameValid) errors = [...errors, 'Scene names must be defined and contain only letters, numbers and underscores'];
  if (!isEverySpatialGridNameValid) errors = [...errors, 'SpatialGrids names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryActorNameValid) errors = [...errors, 'Actor names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryCameraNameValid) errors = [...errors, 'Camera names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionNameValid) errors = [...errors, 'Intersection names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionCameraNameValid) errors = [...errors, 'Intersections "cameraName" must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionActorNamesValid) errors = [...errors, 'Intersections "actorNames" must be an array of strings that contain only letters, numbers and underscores'];
  if (!isEveryLightNameValid) errors = [...errors, 'Light names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryFogNameValid) errors = [...errors, 'Fog names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryTextNameValid) errors = [...errors, 'Text names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryControlsNameValid) errors = [...errors, 'Controls names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryPhysicsPresetNameValid) errors = [...errors, 'Physics presets names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryActorsPhysicsPresetNameValid) errors = [...errors, 'Actors physics preset names must be defined and contain only letters, numbers and underscores'];

  //tags
  if (!isConfigTagsValid) errors = [...errors, 'Space config tags must contain only letters, numbers and underscores'];
  if (!isEverySceneTagsValid) errors = [...errors, 'Scene tags must contain only letters, numbers and underscores'];
  if (!isEverySpatialGridsTagsValid) errors = [...errors, 'SpatialGrids tags must contain only letters, numbers and underscores'];
  if (!isEveryActorTagsValid) errors = [...errors, 'Actor tags must contain only letters, numbers and underscores'];
  if (!isEveryCameraTagsValid) errors = [...errors, 'Camera tags must contain only letters, numbers and underscores'];
  if (!isEveryIntersectionsTagsValid) errors = [...errors, 'Intersection tags must contain only letters, numbers and underscores'];
  if (!isEveryLightTagsValid) errors = [...errors, 'Light tags must contain only letters, numbers and underscores'];
  if (!isEveryFogTagsValid) errors = [...errors, 'Fog tags must contain only letters, numbers and underscores'];
  if (!isEveryTextTagsValid) errors = [...errors, 'Text tags must contain only letters, numbers and underscores'];
  if (!isEveryControlsTagsValid) errors = [...errors, 'Controls tags must contain only letters, numbers and underscores'];
  if (!isEveryModels3dTagsValid) errors = [...errors, 'Models3d tags must contain only letters, numbers and underscores'];
  if (!isEveryMaterialTagsValid) errors = [...errors, 'Materials tags must contain only letters, numbers and underscores'];
  if (!isEveryEnvMapsTagsValid) errors = [...errors, 'EnvMaps tags must contain only letters, numbers and underscores'];
  if (!isEveryTextureTagsValid) errors = [...errors, 'Textures tags must contain only letters, numbers and underscores'];

  //urls
  if (!isEveryModels3dUrlValid) errors = [...errors, 'Models3d urls must contain only valid characters (a normal path to a file)'];
  if (!isEveryEnvMapsUrlValid) errors = [...errors, 'EnvMaps urls must contain only valid characters (a normal path to a file)'];
  if (!isEveryTextureUrlValid) errors = [...errors, 'Textures urls must contain only valid characters (a normal path to a file)'];

  //presets
  if (!isAllActorsHasPhysicsPreset) errors = [...errors, 'Not every actor has a defined physics preset (check actors presetName against physics presets names)'];

  return { isValid: errors.length === 0, errors };
}

const validateNames = (entities: ReadonlyArray<TWithNameOptional>): boolean => entities.every(validateName);
const validateName = (entity: TWithNameOptional): boolean => validateField(entity, 'name');
const validateCameraNames = (entities: ReadonlyArray<Readonly<{ cameraName: string }>>): boolean => entities.every(validateCameraName);
const validateCameraName = (entity: Readonly<{ cameraName: string }>): boolean => validateField(entity, 'cameraName');
const validatePresetName = (entity: Readonly<{ presetName: string }>): boolean => validateField(entity, 'presetName');

function validatePresetNames(entities: ReadonlyArray<Readonly<{ physics?: TWithPresetNamePhysicsBodyConfig }>>): boolean {
  return (
    entities
      .map((entity) => entity.physics)
      .filter(isDefined)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .every((physics) => isNotDefined(physics.presetName) || validatePresetName(physics as any))
  );
}

const validateActorNamesForEveryEntity = (entities: ReadonlyArray<Readonly<{ actorNames: ReadonlyArray<string> }>>): boolean => entities.every(validateActorNames);
const validateActorNames = (entity: Readonly<{ actorNames: ReadonlyArray<string> }>): boolean => validateArrayField(entity, 'actorNames');

const validateTagsForEveryEntity = (entities: ReadonlyArray<TWithReadonlyTags>): boolean => entities.every((e: TWithReadonlyTags): boolean => validateTags(e.tags));
const validateTags = (tags: ReadonlyArray<string> | undefined): boolean => (tags ? tags.every(validate) : true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const validateField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => validate(obj[field]);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
const validateArrayField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => obj[field].every(validate);

const validate = (str: string | undefined): boolean => (isDefined(str) ? str.length > 0 && /^[A-z0-9_]+$/gm.test(str) : true);

function validateAllActorsHasPhysicsPreset(actors: ReadonlyArray<TActorConfig>, presets: ReadonlyArray<TPhysicsPresetConfig> | undefined): boolean {
  return actors.every((actor: TActorConfig) => {
    if (isNotDefined(presets)) return true;
    return presets.some((preset: TPhysicsPresetConfig): boolean => isNotDefined(actor.physics) || isNotDefined(actor.physics?.presetName) || preset.name === actor.physics.presetName);
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
