import type { ActorParams } from '@Engine/Models/ActorParams';
import type { ActorConfig } from '@Engine/Launcher/Models';
import { Color } from 'three';
import { isDefined } from '@Engine/Utils';

export function actorAdapter(config: ActorConfig): ActorParams {
  let result: ActorParams = { ...config };
  const hasColor: boolean = isDefined(config?.materialParams?.color);
  const color: Color | undefined = isDefined(hasColor) ? new Color(config.materialParams.color) : undefined;
  if (hasColor && color) result = { ...result, materialParams: { ...result.materialParams, color } };
  return result;
}
