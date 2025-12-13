import type { Factory, RendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { WebGL1Renderer } from 'three';

export type IRendererFactory = Factory<IRendererWrapper, WebGL1Renderer, RendererParams>;
