import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';
import type { WebGLRenderer } from 'three';

import type { IRendererParams } from './IRendererParams';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererFactory = IAbstractFromConfigWrapperFactory<IRendererWrapper, WebGLRenderer, IRendererParams, void, IAbstractFactory<IRendererWrapper, IRendererParams>>;
