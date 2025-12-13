import type { TIntersectionEvent, TIntersectionsCameraWatcher, TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig, TText3dWrapper } from '@Engine';
import { asRecord, isNotDefined, spaceService } from '@Engine';
import { filter, Subject } from 'rxjs';
import { initMenuApp } from 'showcases_menu/src/main';

import { runtimeEnv } from '@/env';
import { openMainMenu } from '@/Levels/Showcase28Menu/MainMenuService';
import { handleMenuEvents } from '@/Levels/Showcase28Menu/MenuActions';
import { menuEventsBus$ } from '@/Levels/Showcase28Menu/MenuEventsBus';
import type { TAppSettings } from '@/Models';
import { addGizmo } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`[Showcase]: Space "${spaceConfig.name}" is not defined`);

  space.built$.subscribe(showcase);
}

// TODO DESKTOP: Add navigation inside the menu (based on pinia, no URL-based navigation)
// TODO DESKTOP: Add UI elements (make sure Main Menu is over the UI elements and canvas)
export function showcase(space: TSpace): void {
  const { models3dService, scenesService, textService, intersectionsWatcherService, mouseService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();
  const openMenu$: Subject<boolean> = new Subject<boolean>();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

  const text3d: TText3dWrapper = textService.getRegistries().text3dRegistry.getByName('text_3d_1');

  sceneW.addModel3d(planeModel3d);
  sceneW.addText(text3d);

  //Subscribe the menu app's events (clicks, etc.).
  handleMenuEvents(menuEventsBus$);

  // Init the menu app.
  initMenuApp('#menu', menuEventsBus$, {
    showExitBtn: runtimeEnv.VITE_SHOW_EXIT_GAME_MENU_BTN
  });

  const watcherMenuCube: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_menu_cube');

  let isMouseOverMenuCube: boolean = false;
  watcherMenuCube.value$.subscribe((value: TIntersectionEvent): void => {
    isMouseOverMenuCube = !!value;
  });

  mouseService.clickLeftRelease$.pipe(filter((): boolean => isMouseOverMenuCube)).subscribe((): void => openMenu$.next(true));

  openMenu$.pipe().subscribe(openMainMenu);

  space.start$.next(true);
}
