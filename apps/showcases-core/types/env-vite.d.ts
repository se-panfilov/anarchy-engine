/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_BUILD_COMPRESSION: string; // should be cast to boolean
  VITE_BUILD_MINIFIED: string; // should be cast to boolean
  VITE_BUILD_SOURCEMAPS: string; // should be cast to boolean
  VITE_BUILD_PLATFORM: string;
  VITE_APP_SHOW_DEBUG_INFO: string; // should be cast to boolean
  VITE_APP_SHOW_DEV_NAV: string; // should be cast to boolean
  VITE_SHOW_EXIT_GAME_MENU_BTN: string; // should be cast to boolean
  VITE_RELEASE_NAME_PREFIX: string;
  __APP_VERSION__: string;
  // VITE_APP_DRACO_DECODER_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
