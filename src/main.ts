import * as sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { launch } from '@Engine/Launcher';
import type { SceneConfig } from '@Engine/Launcher/Models';

// TODO (S.Panfilov) for a production we need a runtime validation
launch(sceneConfig as unknown as SceneConfig);
