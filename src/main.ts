// import * as sceneConfig from '@Engine/Launcher/debug-scene.config.json';
import { asClass, createContainer, InjectionMode } from 'awilix';
// import { launch } from '@Engine/Launcher';
// import type { SceneConfig } from '@Engine/Launcher/Models';
import TestService from './TestService';
import DependentService from './DependentService';

interface ICradle {
  testService: TestService;
  // depService: DependentService;
}

// Create the container
const container = createContainer<ICradle>({
  injectionMode: InjectionMode.PROXY
});

// Register the classes
container.register({
  testService: asClass(TestService)
  // depService: asClass(DependentService)
});

const dependentService = new DependentService();
console.log(dependentService);
// let dep1 = container.cradle.depService
// console.log(dep1.getInnerData());

// TODO (S.Panfilov) for a production we need a runtime validation
// launch(sceneConfig as unknown as SceneConfig);
