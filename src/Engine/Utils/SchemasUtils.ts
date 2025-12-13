import Ajv from 'ajv';

import type { ICameraConfig } from '@/Engine/Camera';
import type { IControlsConfig } from '@/Engine/Controls';
import type { IWithName } from '@/Engine/Mixins';
import type { ISceneConfig } from '@/Engine/Scene';
import type { ISpaceConfig } from '@/Engine/Space';
import ISpaceConfigSchema from '@/Engine/Space/Schemas/ISpaceConfig.json';

import { isDefined } from './CheckUtils';

const ajv: Ajv = new Ajv();

type SchemaValidationResult = Readonly<{ isValid: boolean; errors: ReadonlyArray<any> | null | undefined }>;

export function validLevelConfig(config: ISpaceConfig): SchemaValidationResult {
  const jsonResult = validateJsonSchema(config);
  const dataResult = validateData(config);
  const jsonErrors: ReadonlyArray<any> = jsonResult.errors ?? [];
  const dataErrors: ReadonlyArray<any> = dataResult.errors ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { isValid: jsonResult.isValid && dataResult.isValid, errors: [...jsonErrors, ...dataErrors] };
}

function validateJsonSchema(config: ISpaceConfig): SchemaValidationResult {
  const validate = ajv.compile(ISpaceConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}

function validateData({ name, actors, cameras, scenes, controls, lights, fogs, texts }: ISpaceConfig): SchemaValidationResult {
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
  const isConfigNameValid: boolean = validateName(name);
  const isEverySceneNameValid: boolean = validateNames(scenes);
  const isEveryActorNameValid: boolean = validateNames(actors);
  const isEveryCameraNameValid: boolean = validateNames(cameras);
  const isEveryLightNameValid: boolean = validateNames(lights);
  const isEveryFogNameValid: boolean = validateNames(fogs);
  const isEveryTextNameValid: boolean = validateNames(texts);
  const isEveryControlsNameValid: boolean = validateNames(controls);

  if (isNoScenesDefined) errors = [...errors, 'No scenes are defined'];
  if (isMultipleActiveCameras) errors = [...errors, 'Can be only one active camera, but multiple set as active'];
  if (isMultipleActiveScenes) errors = [...errors, 'Can be only one active scene, but multiple set as active'];
  if (isMultipleActiveControls) errors = [...errors, 'Can be only one active control, but multiple set as active'];
  if (isControlsWithoutCamera) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!isEveryControlsHasCamera) errors = [...errors, 'Not every control has a camera'];

  if (!isConfigNameValid) errors = [...errors, 'Config name must be defined and contain only letters, numbers and underscores'];
  if (!isEverySceneNameValid) errors = [...errors, 'Scene names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryActorNameValid) errors = [...errors, 'Actor names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryCameraNameValid) errors = [...errors, 'Camera names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryLightNameValid) errors = [...errors, 'Light names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryFogNameValid) errors = [...errors, 'Fog names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryTextNameValid) errors = [...errors, 'Text names must be defined and contain only letters, numbers and underscores'];
  if (!isEveryControlsNameValid) errors = [...errors, 'Controls names must be defined and contain only letters, numbers and underscores'];

  return { isValid: errors.length === 0, errors };
}

// TODO (S.Panfilov) add unit tests
const validateNames = (entities: ReadonlyArray<IWithName>): boolean => entities.every((e: IWithName): boolean => validateName(e.name));

// TODO (S.Panfilov) add unit tests
const validateName = (name: string | undefined): boolean => (isDefined(name) ? name.length > 0 && /^[A-z0-9_]+$/gm.test(name) : true);
