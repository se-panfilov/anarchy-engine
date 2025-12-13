import type { IDestroyable, IWrapper } from '@Engine/Domains/Abstract';
import type { WebGLRenderer } from 'three';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IDestroyable;
