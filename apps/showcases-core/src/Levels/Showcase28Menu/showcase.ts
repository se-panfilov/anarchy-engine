import type { TIntersectionEvent, TIntersectionsCameraWatcher, TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { showcasesTranslationService } from '@Showcases/i18n';
import { filter, Subject } from 'rxjs';
import { initGuiApp } from 'showcases-gui/src/main';
import { initMenuApp } from 'showcases-menu/src/main';

import { runtimeEnv } from '@/env';
import { fromGuiEventsBus$, fromMenuEventsBus$, toGuiEventsBus$, toMenuEventsBus$ } from '@/Levels/Showcase28Menu/EventsBus';
import type { TAppService, TEventsService, TGuiService, TMainMenuService, TSettingsService } from '@/Levels/Showcase28Menu/Models';
import { AppService, EventsService, GuiService, MainMenuService, SettingsService } from '@/Levels/Showcase28Menu/Services';
import type { TAppSettings } from '@/Models';
import { addGizmo } from '@/Utils';

import spaceConfigJson from './space.json';
import { initInputActors } from '@/Levels/Showcase28Menu/Helpers';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`[APP] Space "${spaceConfig.name}" is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { actorService, models3dService, keyboardService, scenesService, textService, intersectionsWatcherService, mouseService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const { clickLeftRelease$ } = mouseService;
  const sceneW: TSceneWrapper = scenesService.getActive();
  const openMenu$: Subject<boolean> = new Subject<boolean>();

  textService.setTextTranslationService(showcasesTranslationService);
  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

  sceneW.addModel3d(planeModel3d);

  const mainMenuService: TMainMenuService = MainMenuService();
  const guiService: TGuiService = GuiService();
  const appService: TAppService = AppService();
  const settingsService: TSettingsService = SettingsService();
  settingsService.isFirstRun().then((isFirstRun: boolean): void => {
    if (isFirstRun) settingsService.setFirstRun(false);
  });
  const eventsService: TEventsService = EventsService({ mainMenuService, appService, settingsService });

  //Subscribe the menu app's events (clicks, etc.).
  eventsService.handleFromMenuEvents(fromMenuEventsBus$.asObservable(), toMenuEventsBus$);

  // Init the menu app.
  initMenuApp('#menu', fromMenuEventsBus$, toMenuEventsBus$.asObservable(), {
    showExitBtn: runtimeEnv.VITE_SHOW_EXIT_GAME_MENU_BTN
  });

  // Init the gui app.
  initGuiApp('#gui', fromGuiEventsBus$, toGuiEventsBus$.asObservable());

  const watcherMenuCube: TIntersectionsCameraWatcher = intersectionsWatcherService.getCameraWatcher('watcher_menu_cube');

  // TODO DESKTOP: Implement also UI (health, ammo, etc.) and make sure it is not under the menu
  let isMouseOverMenuCube: boolean = false;
  watcherMenuCube.value$.subscribe((value: TIntersectionEvent): void => void (isMouseOverMenuCube = !!value));
  clickLeftRelease$.pipe(filter((): boolean => isMouseOverMenuCube)).subscribe((): void => openMenu$.next(true));

  guiService.openGui();

  openMenu$.pipe().subscribe(mainMenuService.openMainMenu);

  initInputActors(actorService, keyboardService, mouseService, intersectionsWatcherService);

  space.start$.next(true);
}
