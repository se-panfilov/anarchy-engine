export enum FromMenuEvents {
  CloseMenu = 'from:menu:close',
  ContinueGame = 'from:menu:game:continue',
  ExitApp = 'from:menu:app:exit',
  GetLegalDocs = 'from:menu:docs:legal:get',
  GetSettings = 'from:menu:settings:get',
  LoadGame = 'from:menu:game:load',
  OpenMenu = 'from:menu:open',
  SetSettings = 'from:menu:settings:set',
  StartNewGame = 'from:menu:game:start-new'
}

export enum ToMenuEvents {
  SettingsReceived = 'to:menu:settings:received',
  LegalDocsReceived = 'to:menu:docs:legal:received'
}
