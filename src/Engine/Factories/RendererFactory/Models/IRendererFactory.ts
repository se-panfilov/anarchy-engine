import type { IFactory, IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { WebGL1Renderer } from 'three';

export type IRendererFactory = IFactory<IRendererWrapper, WebGL1Renderer, IRendererParams, void>;
