import type { IAppGlobalContainer } from '@/Engine/Global';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IScreenSizeWatcher } from '@/Engine/Screen';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IText2dRegistry } from './IText2dRegistry';
import type { IText2dRenderer } from './IText2dRenderer';
import type { IText3dRegistry } from './IText3dRegistry';
import type { IText3dRenderer } from './IText3dRenderer';
import type { ITextAnyWrapper } from './ITextAnyWrapper';
import type { ITextConfig } from './ITextConfig';
import type { ITextFactory } from './ITextFactory';
import type { ITextParams } from './ITextParams';

export type ITextService = IWithCreateService<ITextAnyWrapper, ITextParams> &
  IWithCreateFromConfigService<ITextConfig> &
  IWithFactoryService<ITextFactory> &
  Readonly<{
    getRegistries: () => { text2dRegistry: IText2dRegistry; text3dRegistry: IText3dRegistry };
    createText2dRenderer: (container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>) => IText2dRenderer;
    createText3dRenderer: (container: IAppGlobalContainer, screenSizeWatcher: Readonly<IScreenSizeWatcher>) => IText3dRenderer;
  }> &
  IWithSceneGetterService &
  IDestroyable;
