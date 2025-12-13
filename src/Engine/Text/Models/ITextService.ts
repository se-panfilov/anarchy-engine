import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithSceneGetterService } from '@/Engine/Space';

import type { IText2dRegistry } from './IText2dRegistry';
import type { IText2dRenderer } from './IText2dRenderer';
import type { IText2dRendererRegistry } from './IText2dRendererRegistry';
import type { IText3dRegistry } from './IText3dRegistry';
import type { IText3dRenderer } from './IText3dRenderer';
import type { IText3dRendererRegistry } from './IText3dRendererRegistry';
import type { ITextConfig } from './ITextConfig';
import type { ITextFactory } from './ITextFactory';
import type { ITextParams } from './ITextParams';
import type { TTextAnyWrapper } from './TTextAnyWrapper';

export type ITextService = TWithCreateService<TTextAnyWrapper, ITextParams> &
  TWithCreateFromConfigService<ITextConfig> &
  TWithFactoryService<ITextFactory> &
  Readonly<{
    getRegistries: () => { text2dRegistry: IText2dRegistry; text3dRegistry: IText3dRegistry };
    createText2dRenderer: (container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>) => IText2dRenderer;
    createText3dRenderer: (container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>) => IText3dRenderer;
    getRendererRegistries: () => { text2dRendererRegistry: IText2dRendererRegistry; text3dRendererRegistry: IText3dRendererRegistry };
  }> &
  TWithSceneGetterService &
  TDestroyable;
