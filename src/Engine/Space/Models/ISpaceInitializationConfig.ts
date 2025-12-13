export type ISpaceInitializationConfig = Readonly<{
  scene?: boolean;
  actors?: boolean;
  cameras?: boolean;
  lights?: boolean;
  fogs?: boolean;
  texts?: boolean;
  controls?: boolean;
  envMaps?: boolean;
}>;
