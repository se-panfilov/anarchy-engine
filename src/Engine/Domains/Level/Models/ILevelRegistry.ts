import type { IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import type { ILightRegistry } from '@/Engine/Domains/Light';
import type { ILoopRegistry } from '@/Engine/Domains/Loop';
import type { IRendererRegistry } from '@/Engine/Domains/Renderer';
import type { ISceneRegistry } from '@/Engine/Domains/Scene';

export type ILevelRegistry = Readonly<{
  actor: IActorRegistry;
  camera: ICameraRegistry;
  light: ILightRegistry;
  controls: IControlsRegistry;
  intersectionsWatcher: IIntersectionsWatcherRegistry;
  loop: ILoopRegistry;
  scenes: ISceneRegistry;
  renderer: IRendererRegistry;
}>;
