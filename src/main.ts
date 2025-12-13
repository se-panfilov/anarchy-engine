import sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { ambientContext, startAmbientContext } from '@Engine/Context';
import { isNotDefined, isValidSceneConfig } from '@Engine/Utils';
import './style.css';
import { launch } from '@Engine/Launcher';
import { getRegistryPool } from '@Engine/Pool/GetRegistiryPool';
import type { IRegistriesPool } from '@Engine/Pool/Models/IRegistriesPool';
import { getFactoriesPool } from '@Engine/Pool/GetFactoriesPool';
import type { IFactoriesPool } from '@Engine/Pool/Models/IFactoriesPool';
import type { IAppCanvas } from '@Engine/Models';

const canvas: IAppCanvas | null = document.querySelector('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
if (!isValidSceneConfig(sceneConfig)) throw new Error('Failed to load a scene: invalid data format');

const registryPool: IRegistriesPool = getRegistryPool();
const factoriesPool: IFactoriesPool = getFactoriesPool({ canvas, cameraRegistry: registryPool.cameraRegistry });
const isLaunched: boolean = await launch(sceneConfig, canvas, factoriesPool, registryPool);
console.log('Launched', isLaunched);

//Ambient Context
startAmbientContext(ambientContext);
