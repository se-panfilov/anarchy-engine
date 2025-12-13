import type { IFactory, IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import type { WebGLRenderer } from 'three';

export type IRendererFactory = IFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void>;
