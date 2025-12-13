import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { RendererTag } from '@/Engine/Domains/Renderer/Constants';
import type { IDestroyable, IWithTags } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithTags<RendererTag> & IDestroyable;
