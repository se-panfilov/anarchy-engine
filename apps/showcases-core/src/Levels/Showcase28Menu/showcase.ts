import type { TIntersectionEvent, TIntersectionsCameraWatcher, TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig, TText3dTextureWrapper } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { showcasesTranslationService } from '@Showcases/i18n';
import { filter, Subject } from 'rxjs';
import { initMenuApp } from 'showcases-menu/src/main';

import { runtimeEnv } from '@/env';
import { fromMenuEventsBus$, toMenuEventsBus$ } from '@/Levels/Showcase28Menu/EventsBus';
import type { TAppService, TEventsService, TMainMenuService, TSettingsService } from '@/Levels/Showcase28Menu/Models';
import { AppService, EventsService, MainMenuService, SettingsService } from '@/Levels/Showcase28Menu/Services';
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

// TODO DESKTOP: Add UI elements (make sure Main Menu is over the UI elements and canvas)
export function showcase(space: TSpace): void {
  const { models3dService, scenesService, textService, intersectionsWatcherService, mouseService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();
  const openMenu$: Subject<boolean> = new Subject<boolean>();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

  const text3dTexture: TText3dTextureWrapper = textService.getRegistries().text3dTextureRegistry.getByName('text_3d_2');
  sceneW.addModel3d(planeModel3d);

  const mainMenuService: TMainMenuService = MainMenuService();
  const appService: TAppService = AppService();
  const settingsService: TSettingsService = SettingsService();
  const eventsService: TEventsService = EventsService({ mainMenuService, appService, settingsService });

  //Subscribe the menu app's events (clicks, etc.).
  eventsService.handleFromMenuEvents(fromMenuEventsBus$.asObservable(), toMenuEventsBus$);

  // Init the menu app.
  initMenuApp('#menu', fromMenuEventsBus$, toMenuEventsBus$.asObservable(), {
    showExitBtn: runtimeEnv.VITE_SHOW_EXIT_GAME_MENU_BTN
  });

  const watcherMenuCube: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_menu_cube');

  // TODO DESKTOP: Implement also UI (health, ammo, etc.) and make sure it is not under the menu
  let isMouseOverMenuCube: boolean = false;
  watcherMenuCube.value$.subscribe((value: TIntersectionEvent): void => {
    isMouseOverMenuCube = !!value;
  });

  showcasesTranslationService.t$('main-menu.home.button.new-game.text').subscribe((v: string): void => {
    // text3dTexture.setText(v);
    console.log('XXX text', v);
  });

  mouseService.clickLeftRelease$.pipe(filter((): boolean => isMouseOverMenuCube)).subscribe((): void => openMenu$.next(true));

  openMenu$.pipe().subscribe(mainMenuService.openMainMenu);

  space.start$.next(true);
}
