import * as sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { ambientContext, startAmbientContext } from '@Engine/Context';
import './style.css';
import { launch } from '@Engine/Launcher';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import { isNotDefined } from '@Engine/Utils';

// TODO (S.Panfilov) canvas (or something else) should come from settings or ambient context
const canvas: HTMLCanvasElement | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

function isValidScene(scene: ISceneConfig | unknown): scene is ISceneConfig {
  return true;
}

if (!isValidScene(sceneConfig)) throw new Error('Failed to load a scene: invalid data format');
const isLaunched: boolean = await launch(sceneConfig as unknown as ISceneConfig, canvas);
console.log('Launched', isLaunched);

//Ambient Context
startAmbientContext(ambientContext);
