/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_SENTRY_DSN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
