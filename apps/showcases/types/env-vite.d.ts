/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_SHOW_DEBUG_INFO: string;
  VITE_BUILD_COMPRESSION: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
