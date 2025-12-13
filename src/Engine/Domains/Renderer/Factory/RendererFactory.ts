import { ambientContext } from '@Engine/Context';
import type { IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';
import { RendererWrapper } from '@Engine/Wrappers';

import { AbstractFromConfigWrapperFactory } from '../AbstractFactory';
import type { ICreateRendererFn, IRendererFactory } from './Models';

const create: ICreateRendererFn = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFromConfigWrapperFactory('renderer', create);
