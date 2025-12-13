import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TText2dRegistry } from './TText2dRegistry';
import type { TText2dRenderer } from './TText2dRenderer';
import type { TText2dRendererRegistry } from './TText2dRendererRegistry';
import type { TText3dRegistry } from './TText3dRegistry';
import type { TText3dRenderer } from './TText3dRenderer';
import type { TText3dRendererRegistry } from './TText3dRendererRegistry';
import type { TTextAnyWrapper } from './TTextAnyWrapper';
import type { TTextConfig } from './TTextConfig';
import type { TTextFactory } from './TTextFactory';
import type { TTextParams } from './TTextParams';

export type TTextService = TWithCreateService<TTextAnyWrapper, TTextParams> &
  TWithCreateFromConfigService<TTextConfig, TTextAnyWrapper> &
  TWithFactoryService<TTextFactory> &
  Readonly<{
    getRegistries: () => { text2dRegistry: TText2dRegistry; text3dRegistry: TText3dRegistry };
    createText2dRenderer: (container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>) => TText2dRenderer;
    createText3dRenderer: (container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>) => TText3dRenderer;
    getRendererRegistries: () => { text2dRendererRegistry: TText2dRendererRegistry; text3dRendererRegistry: TText3dRendererRegistry };
  }> &
  TWithSceneGetterService &
  TDestroyable;
