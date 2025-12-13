import { DefaultIsAutoUpdate, DefaultKinematicConfigState, DefaultKinematicTarget } from '@Anarchy/Engine/Kinematic/Constants';
import type { TKinematicConfig } from '@Anarchy/Engine/Kinematic/Models';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { isEqual } from 'lodash-es';

export function ignoreDefaultStateKinematic(config: TKinematicConfig | undefined): TKinematicConfig | undefined {
  if (isNotDefined(config)) return undefined;

  const { state, target, isAutoUpdate } = config;
  const isDefaultState: boolean = isEqual(state, DefaultKinematicConfigState);
  const isDefaultTarget: boolean = isEqual(target, DefaultKinematicTarget);
  const isDefaultAutoUpdate: boolean = isEqual(isAutoUpdate, DefaultIsAutoUpdate);

  return isDefaultState && isDefaultTarget && isDefaultAutoUpdate ? undefined : config;
}
