import { IRendererWrapper, RendererWrapper } from '@Engine/Wrappers';
import type { RendererParams } from '@Engine/Models';
import type { ICreateRendererFn, IRendererFactory } from './Models';
import { AbstractFactory } from '../AbstractFactory';

const create: ICreateRendererFn = (params: RendererParams): IRendererWrapper => RendererWrapper(params);
export const RendererFactory = (): IRendererFactory => AbstractFactory('renderer', create);
