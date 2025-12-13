import '@App/style.css';

import sceneConfig from '@App/Scenes/debug-scene.config.json';

import type { IActorWrapper, ICameraWrapper, IIntersectionsWatcher, ILaunchedEngine, ILaunchedScene, IMousePosition, IRegistries } from '@/Engine';
import { ActorTag, ambientContext, CameraTag, IntersectionsWatcherFactory, isNotDefined, launchEngine, SceneLauncher } from '@/Engine';

const { factories, canvas }: ILaunchedEngine = launchEngine('#app');
const { registries }: ILaunchedScene = SceneLauncher().launch(sceneConfig, canvas, factories);
const { actorRegistry, cameraRegistry }: IRegistries = registries;

const clickableActors: ReadonlyArray<IActorWrapper> = actorRegistry.getAllWithEveryTag([ActorTag.Intersectable]);
const cameraTag: CameraTag = CameraTag.Initial;
const camera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(cameraTag);

if (isNotDefined(camera)) throw new Error(`Cannot init intersection service: camera with tag "${cameraTag}" is not defined`);
const intersectionsWatcher: IIntersectionsWatcher = IntersectionsWatcherFactory().create({ actors: clickableActors, camera, positionWatcher: ambientContext.mousePositionWatcher });

intersectionsWatcher.value$.subscribe((obj: IMousePosition): void => {
  console.log('intersect obj', obj);
});

intersectionsWatcher.start();

ambientContext.mouseClicksWatcher.value$.subscribe((): void => {
  console.log('int click:');
});
