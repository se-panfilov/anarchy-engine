/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_SENTRY_DSN: string | undefined;
  VITE_RELEASE_NAME_PREFIX: string;
  VITE_DIST_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
