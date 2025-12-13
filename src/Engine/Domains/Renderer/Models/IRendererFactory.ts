import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer';
import type { WebGLRenderer } from 'three';

export type IRendererFactory = IAbstractFromConfigWrapperFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void, IAbstractFactory<IRendererWrapper, IRendererParams>>;
