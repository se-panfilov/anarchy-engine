import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { WebGLRenderer } from 'three';
import type { IRendererWrapper, IRendererParams } from '@Engine/Domains/Renderer/Models';

export type IRendererFactory = IAbstractFromConfigWrapperFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void>;
