import Ajv from 'ajv';

import type { ICameraConfig } from '@/Engine/Camera';
import type { IControlsConfig } from '@/Engine/Controls';
import type { IWithName, IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneConfig } from '@/Engine/Scene';
import type { TSpaceConfig } from '@/Engine/Space';
import ISpaceConfigSchema from '@/Engine/Space/Schemas/ISpaceConfig.json';

import { isDefined } from './CheckUtils';

const ajv: Ajv = new Ajv();

type ISchemaValidationResult = Readonly<{ isValid: boolean; errors: ReadonlyArray<any> | null | undefined }>;

export function validLevelConfig(config: TSpaceConfig): ISchemaValidationResult {
  const jsonResult = validateJsonSchema(config);
  const dataResult = validateData(config);
  const jsonErrors: ReadonlyArray<any> = jsonResult.errors ?? [];
  const dataErrors: ReadonlyArray<any> = dataResult.errors ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { isValid: jsonResult.isValid && dataResult.isValid, errors: [...jsonErrors, ...dataErrors] };
}

function validateJsonSchema(config: TSpaceConfig): ISchemaValidationResult {
  const validate = ajv.compile(ISpaceConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}

function validateData({ name, actors, cameras, scenes, controls, intersections, lights, fogs, texts, tags }: TSpaceConfig): ISchemaValidationResult {
  let errors: ReadonlyArray<string> = [];

  //must be defined
  const isNoScenesDefined: boolean = scenes.length === 0;

  //check active entities
  const isMultipleActiveCameras: boolean = cameras.filter((camera: ICameraConfig) => camera.isActive).length > 1;
  const isMultipleActiveScenes: boolean = scenes.filter((scene: ISceneConfig) => scene.isActive).length > 1;
  const isMultipleActiveControls: boolean = controls.filter((control: IControlsConfig) => control.isActive).length > 1;

  //check relations
  const isControlsWithoutCamera: boolean = controls.length > 0 && cameras.length === 0;
  const isEveryControlsHasCamera: boolean = controls.every((control: IControlsConfig) => cameras.some((camera: ICameraConfig): boolean => camera.name === control.cameraName));

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
  //tags
  const isConfigTagsValid: boolean = validateTags(tags);
  const isEverySceneTagsValid: boolean = validateTagsForEveryEntity(scenes);
  const isEveryActorTagsValid: boolean = validateTagsForEveryEntity(actors);
  const isEveryCameraTagsValid: boolean = validateTagsForEveryEntity(cameras);
  const isEveryIntersectionsTagsValid: boolean = validateTagsForEveryEntity(intersections);
  const isEveryLightTagsValid: boolean = validateTagsForEveryEntity(lights);
  const isEveryFogTagsValid: boolean = validateTagsForEveryEntity(fogs);
  const isEveryTextTagsValid: boolean = validateTagsForEveryEntity(texts);
  const isEveryControlsTagsValid: boolean = validateTagsForEveryEntity(controls);

  //Adding errors
  if (isNoScenesDefined) errors = [...errors, 'No scenes are defined'];
  if (isMultipleActiveCameras) errors = [...errors, 'Can be only one active camera, but multiple set as active'];
  if (isMultipleActiveScenes) errors = [...errors, 'Can be only one active scene, but multiple set as active'];
  if (isMultipleActiveControls) errors = [...errors, 'Can be only one active control, but multiple set as active'];
  if (isControlsWithoutCamera) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!isEveryControlsHasCamera) errors = [...errors, 'Not every control has a camera'];

  //names
  if (!isConfigNameValid) errors = [...errors, 'Space config name must be defined and contain only letters, numbers and underscores'];
  if (!isEverySceneNameValid) errors = [...errors, 'Scene names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryActorNameValid) errors = [...errors, 'Actor names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryCameraNameValid) errors = [...errors, 'Camera names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionNameValid) errors = [...errors, 'Intersection names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionCameraNameValid) errors = [...errors, 'Intersections "cameraName" must be defined and contain only letters, numbers and underscores'];
  if (!isEveryIntersectionActorNamesValid) errors = [...errors, 'Intersections "actorNames" must be an array of strings that contain only letters, numbers and underscores'];
  if (!isEveryLightNameValid) errors = [...errors, 'Light names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryFogNameValid) errors = [...errors, 'Fog names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryTextNameValid) errors = [...errors, 'Text names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryControlsNameValid) errors = [...errors, 'Controls names must be defined and contain only letters, numbers and underscores'];
  //tags
  if (!isConfigTagsValid) errors = [...errors, 'Space config tags must contain only letters, numbers and underscores'];
  if (!isEverySceneTagsValid) errors = [...errors, 'Scene tags must contain only letters, numbers and underscores'];
  if (!isEveryActorTagsValid) errors = [...errors, 'Actor tags must contain only letters, numbers and underscores'];
  if (!isEveryCameraTagsValid) errors = [...errors, 'Camera tags must contain only letters, numbers and underscores'];
  if (!isEveryIntersectionsTagsValid) errors = [...errors, 'Intersection tags must contain only letters, numbers and underscores'];
  if (!isEveryLightTagsValid) errors = [...errors, 'Light tags must contain only letters, numbers and underscores'];
  if (!isEveryFogTagsValid) errors = [...errors, 'Fog tags must contain only letters, numbers and underscores'];
  if (!isEveryTextTagsValid) errors = [...errors, 'Text tags must contain only letters, numbers and underscores'];
  if (!isEveryControlsTagsValid) errors = [...errors, 'Controls tags must contain only letters, numbers and underscores'];

  return { isValid: errors.length === 0, errors };
}

const validateNames = (entities: ReadonlyArray<IWithName>): boolean => entities.every(validateName);
const validateName = (entity: IWithName): boolean => validateField(entity, 'name');
const validateCameraNames = (entities: ReadonlyArray<Readonly<{ cameraName: string }>>): boolean => entities.every(validateCameraName);
const validateCameraName = (entity: Readonly<{ cameraName: string }>): boolean => validateField(entity, 'cameraName');

const validateActorNamesForEveryEntity = (entities: ReadonlyArray<Readonly<{ actorNames: ReadonlyArray<string> }>>): boolean => entities.every(validateActorNames);
const validateActorNames = (entity: Readonly<{ actorNames: ReadonlyArray<string> }>): boolean => validateArrayField(entity, 'actorNames');

const validateTagsForEveryEntity = (entities: ReadonlyArray<IWithReadonlyTags>): boolean => entities.every((e: IWithReadonlyTags): boolean => validateTags(e.tags));
const validateTags = (tags: ReadonlyArray<string>): boolean => tags.every(validate);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const validateField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => validate(obj[field]);
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
const validateArrayField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => obj[field].every(validate);

const validate = (str: string | undefined): boolean => (isDefined(str) ? str.length > 0 && /^[A-z0-9_]+$/gm.test(str) : true);
