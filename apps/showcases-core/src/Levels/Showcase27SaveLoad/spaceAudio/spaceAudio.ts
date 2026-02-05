import type { TAudio3dWrapper, TDebugAudioRenderer, TSpace, TSpaceConfig } from '@hellpig/anarchy-engine';
import { DebugAudioRenderer } from '@hellpig/anarchy-engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { addModel3dToScene, getContainer } from '../utils';
import spaceConfig from './spaceAudio.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

const soundName: string = 'gunshot_1';
let renderer: TDebugAudioRenderer | undefined;

export const spaceAudioData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    addModel3dToScene(space, 'surface_model');
    const sound: TAudio3dWrapper = space.services.audioService.getRegistry().getByName(soundName) as TAudio3dWrapper;
    renderer = DebugAudioRenderer(sound, space.services.scenesService.getActive(), space.loops.audioLoop);
  },
  onChange: (space: TSpace): void => {
    const sound: TAudio3dWrapper = space.services.audioService.getRegistry().getByName(soundName) as TAudio3dWrapper;
    sound.entity.setMaxDistance(15);
    sound.seek$.next(sound.seek$.getValue() + 1);
    sound.speed$.next(sound.speed$.getValue() + 1);
    sound.volume$.next(sound.volume$.getValue() - 0.5);
    renderer?.enabled$?.next(false);
    renderer = DebugAudioRenderer(sound, space.services.scenesService.getActive(), space.loops.audioLoop);
    sound.drive.default.setX(10);
  }
};
