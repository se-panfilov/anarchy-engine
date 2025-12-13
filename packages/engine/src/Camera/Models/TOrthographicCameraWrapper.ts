import type { TSerializable } from '@/Mixins';

import type { TCameraWrapper } from './TCameraWrapper';
import type { TOrthographicCamera } from './TOrthographicCamera';
import type { TOrthographicCameraAccessors } from './TOrthographicCameraAccessors';
import type { TOrthographicCameraConfig } from './TOrthographicCameraConfig';

export type TOrthographicCameraWrapper = TCameraWrapper<TOrthographicCamera> & TOrthographicCameraAccessors & TSerializable<TOrthographicCameraConfig>;
