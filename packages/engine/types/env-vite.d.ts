/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_BUILD_COMPRESSION: string; // should be cast to boolean
  VITE_BUILD_MINIFY_MANUAL: string; // should be cast to boolean
  VITE_BUILD_MINIFY_MANGLE: string; // should be cast to boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
