import type { IActorAsyncRegistry, IActorFactory } from '@/Engine/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Controls';
import type { IFogFactory, IFogRegistry } from '@/Engine/Fog';
import type { ILightFactory, ILightRegistry } from '@/Engine/Light';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Renderer';
import type { ISceneFactory, ISceneRegistry } from '@/Engine/Scene';
import type { IText2dRegistry, IText3dRegistry, ITextFactory } from '@/Engine/Text';

export type ISpaceEntities = {
  actorRegistry: IActorAsyncRegistry;
  actorFactory: IActorFactory;
  text2dRegistry: IText2dRegistry;
  text3dRegistry: IText3dRegistry;
  textFactory: ITextFactory;
  cameraRegistry: ICameraRegistry;
  cameraFactory: ICameraFactory;
  lightRegistry: ILightRegistry;
  lightFactory: ILightFactory;
  fogRegistry: IFogRegistry;
  fogFactory: IFogFactory;
  controlsRegistry: IControlsRegistry;
  controlsFactory: IControlsFactory;
  scenesRegistry: ISceneRegistry;
  scenesFactory: ISceneFactory;
  rendererRegistry: IRendererRegistry;
  rendererFactory: IRendererFactory;
};
