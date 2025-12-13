import type { IAbstractFromConfigFactory, IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import type { WebGLRenderer } from 'three';

export type IRendererFactory = IAbstractFromConfigFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void>;
