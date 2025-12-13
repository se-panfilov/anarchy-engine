import type { TWrapper } from '@/Engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyService, TWithMandatoryPhysicsBody, TWithOptionalPhysicsBody, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

// TODO 8.0.0. MODELS: remove?
export function makeWrapperWithPhysicsBody<T extends TWrapper<any> & TWithOptionalPhysicsBody>(
  wrapper: T,
  physics: TWithPresetNamePhysicsBodyParams,
  physicsBodyService: TPhysicsBodyService,
  customCreatePhysicsBodyFn?: (physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService, additionalParams?: Record<string, any>) => TPhysicsBody,
  additionalParams?: Record<string, any>
): TWithMandatoryPhysicsBody<T> {
  // eslint-disable-next-line functional/immutable-data
  (wrapper as TWriteable<T>).physicsBody = customCreatePhysicsBodyFn ? customCreatePhysicsBodyFn(physics, physicsBodyService, additionalParams) : createPhysicsBodyObject(physics, physicsBodyService);

  return wrapper as TWithMandatoryPhysicsBody<T>;
}

export function createPhysicsBodyObject(physics: TWithPresetNamePhysicsBodyParams, physicsBodyService: TPhysicsBodyService): TPhysicsBody {
  const { presetName, ...rest } = physics;
  if (isDefined(presetName)) return physicsBodyService.createWithPresetName(physics, presetName);
  if (!isPhysicsBodyParamsComplete(rest))
    throw new Error('Cannot create physics body: params are lacking of mandatory fields (mandatory fields must be set or a preset with such fields must be provided)');
  return physicsBodyService.create(rest);
}
