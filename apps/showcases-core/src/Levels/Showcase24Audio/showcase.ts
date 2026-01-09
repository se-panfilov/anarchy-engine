import type {
  TActor,
  TAnyAudioWrapper,
  TAudio3dWrapper,
  TDebugAudioRenderer,
  TFsmStates,
  TFsmWrapper,
  TLoop,
  TMilliseconds,
  TModel3d,
  TReadonlyVector3,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpaceLoops,
  TSpaceServices
} from '@Anarchy/Engine';
import { DebugAudioRenderer, isAudio3dWrapper, spaceService } from '@Anarchy/Engine';
import { asRecord, isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import GUI from 'lil-gui';
import { distinctUntilChanged } from 'rxjs';
import type { AnimationAction, AudioListener } from 'three';
import { Clock } from 'three';

import type { TAppSettings } from '@/Models';
import { enableFPSCounter, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];

  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const gui: GUI = new GUI();

  const { scenesService, audioService } = space.services;
  const { audioLoop } = space.loops;
  const mainListener: AudioListener | undefined = audioService.getMainListener();

  if (isNotDefined(mainListener)) throw new Error('Main audio listener is not found');

  const scene: TSceneWrapper = scenesService.getActive();

  const gunshotName1: string = 'gunshot_1';
  const gunshotName2: string = 'gunshot_2';

  const gunshot1: TAudio3dWrapper = audioService.getRegistry().getByName(gunshotName1) as TAudio3dWrapper;
  DebugAudioRenderer(gunshot1, scene, audioLoop);
  const gunshot2: TAudio3dWrapper = audioService.getRegistry().getByName(gunshotName2) as TAudio3dWrapper;
  DebugAudioRenderer(gunshot2, scene, audioLoop);

  initMutant('mutant_actor_1', space.services);
  const lady: TActor = initLady('medea_actor', gunshot1, space.services);
  initMovingCube('box_actor', gunshot2, space.services, space.loops);
  initMusicWithControls('bg_music', 'Background music', gui, space.services);
  initMusicWithControls('monster_singing', 'Positional music', gui, space.services, { loop: audioLoop, scene });

  //Keep in mind that setInterval/setTimeout could be slowdown in background tabs, don't use it for production (or use in web workers)
  setInterval((): void => {
    const ladyShootFsm: TFsmWrapper = lady.getAnimationsFsm();
    ladyShootFsm.send$.next('Shoot');
    setTimeout((): void => ladyShootFsm.send$.next('Idle'), 500);
  }, 1500);

  space.start$.next(true);
}

function initMutant(actorName: string, { animationsService, actorService }: TSpaceServices): TActor {
  const actor: TActor = actorService.getRegistry().getByName(actorName);

  const model3d: TModel3d = actor.model3d;
  const fadeDuration = 0.3;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];
  danceAction.reset().fadeIn(fadeDuration).play();

  return actor;
}

function initLady(actorName: string, gunshotAudioW: TAudio3dWrapper, { animationsService, actorService }: TSpaceServices): TActor {
  const actor: TActor = actorService.getRegistry().getByName(actorName);
  const model3d: TModel3d = actor.model3d;
  const fadeDuration = 0.3;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const shootAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];
  shootAction.reset().fadeIn(fadeDuration).play();

  const { animationsFsm } = actor.states;
  if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

  animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    switch (state) {
      case 'Idle':
        shootAction.fadeOut(fadeDuration);
        // idleAction.reset().fadeIn(fadeDuration).play();
        break;
      case 'Shoot':
        gunshotAudioW.drive.position$.next(actor.drive.position$.value.clone());
        gunshotAudioW.play$.next(true);
        // idleAction.fadeOut(fadeDuration);
        setTimeout(() => shootAction.reset().fadeIn(fadeDuration).play(), 100);
        break;
      default:
        throw new Error(`Unknown state: ${String(state)}`);
    }
  });

  return actor;
}

function initMusicWithControls(
  name: string,
  folderName: string,
  gui: GUI,
  { audioService }: TSpaceServices,
  {
    loop,
    scene
  }: {
    loop?: TLoop;
    scene?: TSceneWrapper;
  } = {}
): TAnyAudioWrapper {
  const folder: GUI = gui.addFolder(folderName);
  const audioW: TAnyAudioWrapper = audioService.getRegistry().getByName(name);
  const isDebugRendererEnabled: boolean = isAudio3dWrapper(audioW) && isDefined(loop) && isDefined(scene);

  let debugAudioRenderer: TDebugAudioRenderer | undefined;
  if (isDebugRendererEnabled) debugAudioRenderer = DebugAudioRenderer(audioW as TAudio3dWrapper, scene as TSceneWrapper, loop as TLoop);

  const state = {
    playMusic: (): void => audioW.play$.next(true),
    pauseMusic: (): void => audioW.pause$.next(true),
    resumeMusic: (): void => audioW.pause$.next(false),
    stopMusic: (): void => audioW.play$.next(false),
    seekPlus: (): void => audioW.seek$.next(audioW.seek$.getValue() + 10),
    seekMinus: (): void => audioW.seek$.next(audioW.seek$.getValue() - 10),
    loop: (): void => audioW.loop$.next(!audioW.loop$.getValue()),
    toggleDebugRenderer: (): void => debugAudioRenderer?.enabled$.next(!debugAudioRenderer?.enabled$.value),
    volume: 1,
    speed: 1,
    progress: 0
  };

  folder.add(state, 'playMusic').name('Play');
  folder.add(state, 'pauseMusic').name('Pause');
  folder.add(state, 'resumeMusic').name('Resume');
  folder.add(state, 'stopMusic').name('Stop');
  folder.add(state, 'seekPlus').name('Seek +10s');
  folder.add(state, 'seekMinus').name('Seek -10s');
  folder.add(state, 'loop').name('Loop');
  folder
    .add(state, 'volume', 0, 1)
    .name('Volume')
    .onChange((value: number): void => {
      audioW.volume$.next(value);
    });
  folder
    .add(state, 'speed', 1, 2)
    .name('Speed')
    .onChange((value: number): void => {
      audioW.speed$.next(value);
    });
  if (isDebugRendererEnabled) folder.add(state, 'toggleDebugRenderer').name('Debug renderer');

  return audioW;
}

function initMovingCube(actorName: string, sound: TAudio3dWrapper, { actorService }: TSpaceServices, { transformLoop }: TSpaceLoops): TActor {
  const actor: TActor = actorService.getRegistry().getByName(actorName);
  const clock: Clock = new Clock();
  const center: TReadonlyVector3 = actor.drive.position$.value.clone();
  const radius = 3;

  //Keep in mind that setInterval/setTimeout could be slowdown in background tabs, don't use it for production (or use in web workers)
  setInterval((): void => sound.play$.next(true), 500);

  transformLoop.tick$.subscribe((): void => {
    const elapsedTime: TMilliseconds = clock.getElapsedTime() as TMilliseconds;

    const x: number = center.x + Math.sin(elapsedTime) * radius;
    const y: number = center.y;
    const z: number = center.z + Math.cos(elapsedTime) * radius;

    actor.drive.default.setX(x);
    actor.drive.default.setY(y);
    actor.drive.default.setZ(z);

    // eslint-disable-next-line functional/immutable-data
    sound.drive.connected.positionConnector.x = x;
    // eslint-disable-next-line functional/immutable-data
    sound.drive.connected.positionConnector.y = y;
    // eslint-disable-next-line functional/immutable-data
    sound.drive.connected.positionConnector.z = z;
  });

  return actor;
}
