/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  VITE_SENTRY_DSN: string | undefined;
  VITE_RELEASE_NAME_PREFIX: string;
  VITE_IS_DEV_TOOL_OPEN: string | undefined; // should be cast to boolean
  VITE_DIST_NAME: string;
  VITE_IS_FORCE_DPR: string; // should be cast to boolean
  VITE_HIGH_DPI_SUPPORT: string; // should be cast to number
  VITE_IS_E2E: string | undefined; // should be cast to number
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
