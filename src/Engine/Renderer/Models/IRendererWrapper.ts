import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithActive, IWithTags } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithActive<WebGLRenderer> & IWithTags<string> & IDestroyable;
