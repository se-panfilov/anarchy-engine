import type { ICreateRendererFn, IRendererFactory } from './Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { RendererWrapper } from '@Engine/Wrappers';
import type { RendererParams } from '@Engine/Models';
import { AbstractFactory } from '../AbstractFactory';
import { ambientContext } from '@Engine/Context';

const create: ICreateRendererFn = (params: RendererParams): IRendererWrapper =>
  RendererWrapper(params, ambientContext.deviceWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFactory('renderer', create);
