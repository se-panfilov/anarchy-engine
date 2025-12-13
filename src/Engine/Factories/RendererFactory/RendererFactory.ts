import { ambientContext } from '@Engine/Context';
import type { IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { RendererWrapper } from '@Engine/Wrappers';

import { AbstractFactory } from '../AbstractFactory';
import type { ICreateRendererFn, IRendererFactory } from './Models';

const create: ICreateRendererFn = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFactory('renderer', create);
