import _ from 'lodash';

import { DefaultIsAutoUpdate, DefaultKinematicConfigState, DefaultKinematicTarget } from '@/Kinematic';
import type { TKinematicConfig } from '@/Kinematic/Models';
import { isNotDefined } from '@/Utils';

export function ignoreDefaultStateKinematic(config: TKinematicConfig | undefined): TKinematicConfig | undefined {
  if (isNotDefined(config)) return undefined;

  const { state, target, isAutoUpdate } = config;
  const isDefaultState: boolean = _.isEqual(state, DefaultKinematicConfigState);
  const isDefaultTarget: boolean = _.isEqual(target, DefaultKinematicTarget);
  const isDefaultAutoUpdate: boolean = _.isEqual(isAutoUpdate, DefaultIsAutoUpdate);

  return isDefaultState && isDefaultTarget && isDefaultAutoUpdate ? undefined : config;
}
