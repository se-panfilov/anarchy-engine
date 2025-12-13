import type { IActorAsyncRegistry } from '@/Engine/Actor';
import type { ICameraRegistry } from '@/Engine/Camera';
import type { IControlsRegistry } from '@/Engine/Controls';
import type { IFogRegistry } from '@/Engine/Fog';
import type { ILightRegistry } from '@/Engine/Light';
import type { IRendererRegistry } from '@/Engine/Renderer';
import type { ISceneRegistry } from '@/Engine/Scene';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer } from '@/Engine/Text';

export type ISpaceRegistries = {
  actorRegistry?: IActorAsyncRegistry;
  text2dRegistry?: IText2dRegistry;
  text2dRenderer?: IText2dRenderer;
  text3dRegistry?: IText3dRegistry;
  text3dRenderer?: IText3dRenderer;
  cameraRegistry?: ICameraRegistry;
  lightRegistry?: ILightRegistry;
  fogRegistry?: IFogRegistry;
  controlsRegistry?: IControlsRegistry;
  sceneRegistry?: ISceneRegistry;
  rendererRegistry?: IRendererRegistry;
};
