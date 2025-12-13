/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_BUILD_COMPRESSION: string;
  VITE_BUILD_MINIFY_MANUAL: string;
  VITE_BUILD_MINIFY_MANGLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
