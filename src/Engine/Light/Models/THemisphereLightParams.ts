import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { THemisphereLightProps } from './THemisphereLightProps';

export type THemisphereLightParams = THemisphereLightProps & TObject3DParams & TWithReadonlyTags;
