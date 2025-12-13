import type { IAbstractFromConfigWrapperFactory, IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import type { WebGLRenderer } from 'three';

export type IRendererFactory = IAbstractFromConfigWrapperFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void>;
