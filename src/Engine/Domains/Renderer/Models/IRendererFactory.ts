import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { WebGLRenderer } from 'three';

export type IRendererFactory = IAbstractFromConfigWrapperFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void>;
