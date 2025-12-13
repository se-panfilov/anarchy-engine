import type { IWrapper } from '@Engine/Domains/Abstract';
import type { IDestroyable } from '@Engine/Domains/Mixins';
import type { WebGLRenderer } from 'three';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IDestroyable;
