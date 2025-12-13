import type { TPhysicsBodyConfig, TPhysicsConfig } from '@/Engine';
import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TActorConfig } from '@/Engine/Actor';
import type { TAnyAudioConfig, TAudioResourceConfig } from '@/Engine/Audio';
import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TModel3dConfig, TModel3dResourceConfig } from '@/Engine/Models3d';
import { isPrimitiveModel3dResourceConfig, isPrimitiveModel3dSource } from '@/Engine/Models3d';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const validateNames = (entities: ReadonlyArray<TWithNameOptional>): boolean => entities.every(validateName);
export const validateName = (entity: TWithNameOptional): boolean => validateField(entity, 'name');
export const validateCameraNames = (
  entities: ReadonlyArray<
    Readonly<{
      cameraName: string;
    }>
  >
): boolean => entities.every(validateCameraName);
export const validateCameraName = (entity: Readonly<{ cameraName: string }>): boolean => validateField(entity, 'cameraName');

export const validateActorNamesForEveryEntity = (
  entities: ReadonlyArray<
    Readonly<{
      actorNames: ReadonlyArray<string>;
    }>
  >
): boolean => entities.every(validateActorNames);

export const validateActorNames = (
  entity: Readonly<{
    actorNames: ReadonlyArray<string>;
  }>
): boolean => validateArrayField(entity, 'actorNames');

export const validateTagsForEveryEntity = (entities: ReadonlyArray<TWithTags>): boolean => entities.every((e: TWithTags): boolean => validateTags(e.tags));
export const validateTags = (tags: ReadonlyArray<string> | undefined): boolean => (tags ? tags.every(validate) : true);

export const validateField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => validate(obj[field]);
export const validateArrayField = <T extends Record<string, any>>(obj: T, field: keyof T): boolean => obj[field].every(validate);

export const validate = (str: string | undefined): boolean => (isDefined(str) ? str.length > 0 && /^[A-z0-9_]+$/gm.test(str) : true);

export function validateAllActorsHasModel3d(actors: ReadonlyArray<TActorConfig>, models3d: ReadonlyArray<TModel3dConfig> | undefined): boolean {
  const sources: ReadonlyArray<string> = models3d?.map((v: TModel3dConfig): string => v.name) ?? [];
  return actors.every((actor: TActorConfig): boolean => (isNotDefined(models3d) ? true : sources.includes(actor.model3dSource)));
}

export function validateAllActorsWithPhysicsHasRelatedPhysicsBody(actors: ReadonlyArray<TActorConfig>, physics: TPhysicsConfig): boolean {
  if (isNotDefined(physics.bodies)) return true;
  const { bodies } = physics;
  if (bodies.length === 0) return true;

  return actors.every((actor: TActorConfig): boolean => {
    if (isNotDefined(actor.physicsBodyName)) return true;
    return bodies.some((body: TPhysicsBodyConfig): boolean => body.name === actor.physicsBodyName);
  });
}

// TODO would be nice to check all the resources and relations (e.g. materials)
export function validateAllModel3dEntityHasValidResource(entities: ReadonlyArray<TModel3dConfig>, resources: ReadonlyArray<TModel3dResourceConfig>): boolean {
  return entities.every((entity: TModel3dConfig): boolean => {
    if (isPrimitiveModel3dSource(entity.model3dSource)) return true;
    return resources.some((resource: TModel3dResourceConfig): boolean => resource.name === entity.model3dSource);
  });
}

export function validateAllAudioEntityHasValidResource(entities: ReadonlyArray<TAnyAudioConfig>, resources: ReadonlyArray<TAudioResourceConfig>): boolean {
  return entities.every((entity: TAnyAudioConfig): boolean => {
    return resources.some((resource: TAudioResourceConfig): boolean => resource.name === entity.audioSource);
  });
}

export function validateModel3dFileUrls(configs: ReadonlyArray<TModel3dResourceConfig>): boolean {
  return configs.every((config: TModel3dResourceConfig): boolean => {
    if (isPrimitiveModel3dResourceConfig(config)) return true;
    return validateFileUrl(config.url);
  });
}

export function validateFileUrls(configs: ReadonlyArray<TAbstractResourceConfig>): boolean {
  return configs.every(({ url }: TAbstractResourceConfig): boolean => validateFileUrl(url));
}

export function validateFileUrl(url: string): boolean {
  const regex = /^(\/|[a-zA-Z]:\\)[a-zA-Z0-9_\-/\\]+\.([A-z0-9]{1,4})$/;
  return regex.test(url);
}
