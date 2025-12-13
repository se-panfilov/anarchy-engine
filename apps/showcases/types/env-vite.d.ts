/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_BUILD_COMPRESSION: boolean;
  VITE_BUILD_MINIFIED: boolean;
  VITE_BUILD_SOURCEMAPS: boolean;
  VITE_BUILD_TARGET_DIR: string;
  VITE_APP_SHOW_DEBUG_INFO: string;
  VITE_APP_DRACO_DECODER_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
