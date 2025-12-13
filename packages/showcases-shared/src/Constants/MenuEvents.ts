export enum FromMenuEvents {
  CloseMenu = 'menu:close',
  ContinueGame = 'menu:game:continue',
  ExitApp = 'menu:app:exit',
  GetLegalDocs = 'menu:docs:legal:get',
  GetSettings = 'menu:settings:get',
  LoadGame = 'menu:game:load',
  OpenMenu = 'menu:open',
  SetSettings = 'menu:settings:set',
  StartNewGame = 'menu:game:start-new'
}

export enum ToMenuEvents {
  SettingsReceived = 'app:settings:received',
  LegalDocsReceived = 'app:docs:legal:received'
}
