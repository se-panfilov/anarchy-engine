import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TDestroyable;
