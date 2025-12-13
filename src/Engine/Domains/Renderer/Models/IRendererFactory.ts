import type { IFactory, IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IRendererParams } from './IRendererParams';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererFactory = IFactory<IRendererWrapper, IRendererParams> & IReactiveFactory<IRendererWrapper> & IDestroyable;
