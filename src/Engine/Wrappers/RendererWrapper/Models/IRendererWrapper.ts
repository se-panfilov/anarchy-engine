import type { AbstractWrapper } from '@Engine/Wrappers';
import type { WebGL1Renderer } from 'three';

export type IRendererWrapper = ReturnType<typeof AbstractWrapper<WebGL1Renderer>>;
