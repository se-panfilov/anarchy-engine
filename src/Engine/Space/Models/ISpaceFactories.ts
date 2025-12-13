import type { IActorFactory } from '@/Engine/Actor';
import type { ICameraFactory } from '@/Engine/Camera';
import type { IControlsFactory } from '@/Engine/Controls';
import type { IFogFactory } from '@/Engine/Fog';
import type { ILightFactory } from '@/Engine/Light';
import type { IRendererFactory } from '@/Engine/Renderer';
import type { ISceneFactory } from '@/Engine/Scene';
import type { IText2dRenderer, IText3dRenderer, ITextFactory } from '@/Engine/Text';

export type ISpaceFactories = {
  actorFactory?: IActorFactory;
  text2dRenderer?: IText2dRenderer;
  text3dRenderer?: IText3dRenderer;
  textFactory?: ITextFactory;
  cameraFactory?: ICameraFactory;
  lightFactory?: ILightFactory;
  fogFactory?: IFogFactory;
  controlsFactory?: IControlsFactory;
  sceneFactory?: ISceneFactory;
  rendererFactory?: IRendererFactory;
};
