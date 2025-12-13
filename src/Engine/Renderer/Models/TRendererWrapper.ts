import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TRendererAccessors } from './TRendererAccessors';

export type TRendererWrapper = TWrapper<WebGLRenderer> & TWithActiveMixin & TRendererAccessors;
