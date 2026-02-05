import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';

import type { TCameraWrapper } from './TCameraWrapper';
import type { TPerspectiveCamera } from './TPerspectiveCamera';
import type { TPerspectiveCameraAccessors } from './TPerspectiveCameraAccessors';
import type { TPerspectiveCameraConfig } from './TPerspectiveCameraConfig';

export type TPerspectiveCameraWrapper = TCameraWrapper<TPerspectiveCamera> & TPerspectiveCameraAccessors & TSerializable<TPerspectiveCameraConfig>;
