import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IText2dRegistry } from './IText2dRegistry';
import type { IText3dRegistry } from './IText3dRegistry';
import type { ITextAnyWrapper } from './ITextAnyWrapper';
import type { ITextConfig } from './ITextConfig';
import type { ITextFactory } from './ITextFactory';
import type { ITextParams } from './ITextParams';

export type ITextService = IWithCreateService<ITextAnyWrapper, ITextParams> &
  IWithCreateFromConfigService<ITextConfig> &
  IWithFactoryService<ITextFactory> &
  Readonly<{
    getRegistries: () => { text2dRegistry: IText2dRegistry; text3dRegistry: IText3dRegistry };
  }> &
  IWithSceneGetterService &
  IDestroyable;
