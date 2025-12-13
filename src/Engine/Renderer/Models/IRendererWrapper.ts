import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithTags } from '@/Engine/Mixins';
import type { RendererTag } from '@/Engine/Renderer/Constants';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithTags<RendererTag> & IDestroyable;
