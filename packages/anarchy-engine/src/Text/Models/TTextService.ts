import type { TSerializableEntitiesService } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithSceneGetterService } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TText2dRegistry } from './TText2dRegistry';
import type { TText2dRenderer } from './TText2dRenderer';
import type { TText2dRendererRegistry } from './TText2dRendererRegistry';
import type { TText3dRegistry } from './TText3dRegistry';
import type { TText3dRenderer } from './TText3dRenderer';
import type { TText3dRendererRegistry } from './TText3dRendererRegistry';
import type { TText3dTextureRegistry } from './TText3dTextureRegistry';
import type { TTextAnyWrapper } from './TTextAnyWrapper';
import type { TTextConfig } from './TTextConfig';
import type { TTextFactory } from './TTextFactory';
import type { TTextParams } from './TTextParams';
import type { TTextServiceDependencies } from './TTextServiceDependencies';
import type { TTextTranslationService } from './TTextTranslationService';

export type TTextServiceWithCreate = TWithCreateService<TTextAnyWrapper, TTextParams>;
export type TTextServiceWithCreateFromConfig = TWithCreateFromConfigService<TTextConfig, TTextAnyWrapper>;
export type TTextServiceWithFactory = TWithFactoryService<TTextAnyWrapper, TTextParams, TTextServiceDependencies, TTextFactory>;

export type TTextService = TSerializableEntitiesService<TTextAnyWrapper, TTextConfig> &
  TTextServiceWithCreate &
  TTextServiceWithCreateFromConfig &
  TTextServiceWithFactory &
  Readonly<{
    injectStyle: () => void;
    setTextTranslationService: (translationService: TTextTranslationService) => void;
    getRegistries: () => { text2dRegistry: TText2dRegistry; text3dRegistry: TText3dRegistry; text3dTextureRegistry: TText3dTextureRegistry };
    createText2dRenderer: (container: TContainerDecorator) => TText2dRenderer;
    createText3dRenderer: (container: TContainerDecorator) => TText3dRenderer;
    getRendererRegistries: () => { text2dRendererRegistry: TText2dRendererRegistry; text3dRendererRegistry: TText3dRendererRegistry };
    activeText2dRenderer: Observable<TText2dRenderer | undefined>;
    activeText3dRenderer: Observable<TText3dRenderer | undefined>;
    getActiveText2dRenderer: () => TText2dRenderer | undefined;
    getActiveText3dRenderer: () => TText3dRenderer | undefined;
  }> &
  TWithSceneGetterService;
