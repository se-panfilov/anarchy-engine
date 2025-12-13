import { ambientContext } from '@Engine/Context';
import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IRendererFactory, IRendererParams, IRendererWrapper } from '../Models';
import { RendererWrapper } from '../Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => ({ ...AbstractFactory('renderer'), create });
