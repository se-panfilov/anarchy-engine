import { DefaultIsAutoUpdate, DefaultKinematicConfigState, DefaultKinematicTarget } from '@Engine/Kinematic';
import type { TKinematicConfig } from '@Engine/Kinematic/Models';
import { isNotDefined } from '@Engine/Utils';
import _ from 'lodash';

export function ignoreDefaultStateKinematic(config: TKinematicConfig | undefined): TKinematicConfig | undefined {
  if (isNotDefined(config)) return undefined;

  const { state, target, isAutoUpdate } = config;
  const isDefaultState: boolean = _.isEqual(state, DefaultKinematicConfigState);
  const isDefaultTarget: boolean = _.isEqual(target, DefaultKinematicTarget);
  const isDefaultAutoUpdate: boolean = _.isEqual(isAutoUpdate, DefaultIsAutoUpdate);

  return isDefaultState && isDefaultTarget && isDefaultAutoUpdate ? undefined : config;
}
