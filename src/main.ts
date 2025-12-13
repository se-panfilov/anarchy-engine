import sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import { ambientContext, startAmbientContext } from '@Engine/Context';
import './style.css';
import { launch } from '@Engine/Launcher';
import type { ISceneConfig } from '@Engine/Launcher/Models';

// TODO (S.Panfilov) canvas (or something else) should come from settings or ambient context
const canvas: HTMLCanvasElement | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');

if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to load a scene: invalid data format');
const isLaunched: boolean = await launch(sceneConfig as unknown as ISceneConfig, canvas);
console.log('Launched', isLaunched);

//Ambient Context
startAmbientContext(ambientContext);
