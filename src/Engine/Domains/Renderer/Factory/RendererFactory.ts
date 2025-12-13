import { ambientContext } from '@Engine/Context';
import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IRendererFactory, IRendererParams, IRendererWrapper } from '../Models';
import { RendererWrapper } from '../Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<IRendererWrapper, IRendererParams> = { ...ReactiveFactory('renderer', create) };
export const RendererFactory = (): IRendererFactory => ({ ...factory });
