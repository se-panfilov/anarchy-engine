import { AbstractFactory, CreateFN } from './AbstractFactory';
import { IRendererWrapper, RendererWrapper } from '@Engine/Wrappers';
import type { Factory, RendererParams } from '@Engine/Models';
import type { WebGL1Renderer } from 'three';

const create: CreateFN<ReturnType<typeof RendererWrapper>, RendererParams> = (
  params: RendererParams
): ReturnType<typeof RendererWrapper> => RendererWrapper(params);

export const RendererFactory = (): Factory<IRendererWrapper, WebGL1Renderer, RendererParams> =>
  AbstractFactory('renderer', create);
