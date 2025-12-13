import Ajv from 'ajv';

import type { ICameraConfig } from '@/Engine/Camera';
import type { IControlsConfig } from '@/Engine/Controls';
import type { ISceneConfig } from '@/Engine/Scene';
import type { ISpaceConfig } from '@/Engine/Space';
import ISpaceConfigSchema from '@/Engine/Space/Schemas/ISpaceConfig.json';

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

function validateData({ cameras, scenes, controls }: ISpaceConfig): SchemaValidationResult {
  let errors: ReadonlyArray<string> = [];
  const isNoScenesDefined: boolean = scenes.length === 0;
  const isMultipleActiveCameras: boolean = cameras.filter((camera: ICameraConfig) => camera.isActive).length > 1;
  const isMultipleActiveScenes: boolean = scenes.filter((scene: ISceneConfig) => scene.isActive).length > 1;
  const isMultipleActiveControls: boolean = controls.filter((control: IControlsConfig) => control.isActive).length > 1;
  const isControlsWithoutCamera: boolean = controls.length > 0 && cameras.length === 0;
  const isEveryControlsHasCamera: boolean = controls.every((control: IControlsConfig) => cameras.some((camera: ICameraConfig): boolean => camera.name === control.cameraName));

  if (isNoScenesDefined) errors = [...errors, 'No scenes are defined'];
  if (isMultipleActiveCameras) errors = [...errors, 'Can be only one active camera, but multiple set as active'];
  if (isMultipleActiveScenes) errors = [...errors, 'Can be only one active scene, but multiple set as active'];
  if (isMultipleActiveControls) errors = [...errors, 'Can be only one active control, but multiple set as active'];
  if (isControlsWithoutCamera) errors = [...errors, 'Controls cannot be defined without at least one camera, but there are no cameras'];
  if (!isEveryControlsHasCamera) errors = [...errors, 'Not every control has a camera'];

  return { isValid: errors.length === 0, errors };
}
