import type { ICreateRendererFn, IRendererFactory } from './Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { RendererWrapper } from '@Engine/Wrappers';
import type { IRendererParams } from '@Engine/Models';
import { AbstractFactory } from '../AbstractFactory';
import { ambientContext } from '@Engine/Context';

const create: ICreateRendererFn = (params: IRendererParams): IRendererWrapper =>
  RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFactory('renderer', create);
