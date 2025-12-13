import type { TFromMenuEvent, TToMenuEvent } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';

import type { TAppService } from './TAppService';
import type { TMainMenuService } from './TMainMenuService';
import type { TSettingsService } from './TSettingsService';

export type TEventsService = Readonly<{
  handleFromMenuEvents: (fromMenuEventsBus$: Observable<TFromMenuEvent>, toMenuEventsBus$: Subject<TToMenuEvent>) => void;
}>;

export type TEventsServiceDependencies = Readonly<{
  mainMenuService: TMainMenuService;
  appService: TAppService;
  settingsService: TSettingsService;
}>;
