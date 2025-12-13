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
  VITE_BUILD_TARGET_DIR: string;
  VITE_APP_SHOW_DEBUG_INFO: string; // should be cast to boolean
  VITE_SHOW_EXIT_BTN: string; // should be cast to boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
