import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IDestroyable;
