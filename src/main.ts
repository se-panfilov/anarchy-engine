import * as sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { ambientContext, startAmbientContext } from '@Engine/Context';
import './style.css';
import { launch } from '@Engine/Launcher';
import type { ISceneConfig } from '@Engine/Launcher/Models';

// TODO (S.Panfilov) for a production we need a runtime validation
launch(sceneConfig as unknown as ISceneConfig);

//Ambient Context
startAmbientContext(ambientContext);
