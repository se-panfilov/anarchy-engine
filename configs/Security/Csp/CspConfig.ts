export type TFetchDirectives =
  | 'default-src'
  | 'script-src'
  | 'style-src'
  | 'connect-src'
  | 'object-src'
  | 'img-src'
  | 'frame-src'
  | 'child-src'
  | 'font-src'
  | 'manifest-src'
  | 'media-src'
  | 'report-to'
  | 'sandbox'
  | 'script-src-attr'
  | 'script-src-elem'
  | 'style-src-attr'
  | 'style-src-elem'
  | 'upgrade-insecure-requests'
  | 'worker-src'
  | 'fenced-frame-src';
export type TDocumentDirectives = 'base-uri' | 'sandbox';
export type TNavigationDirectives = 'form-action' | 'frame-ancestors';
export type TReportingDirectives = 'report-to';
export type TOtherDirectives = 'require-trusted-types-for' | 'trusted-types' | 'upgrade-insecure-requests';
export type TDeprecatedDirectives = 'block-all-mixed-content' | 'report-uri';

export type TCspKeys = TFetchDirectives | TDocumentDirectives | TNavigationDirectives | TReportingDirectives | TOtherDirectives | TDeprecatedDirectives;

export type TCspRulles = Partial<Record<TCspKeys, Array<string>>>;

export const BASE_CSP: TCspRulles = {
  'default-src': ["'self'"],

  //No unsave-eval, no inline scripts/styles, but allow WASM eval.
  'script-src': ["'self'", "'wasm-unsafe-eval'"],
  'script-src-elem': ["'self'", "'wasm-unsafe-eval'"],

  'style-src': ["'self'"],

  // A compromise for libs with inline styles
  'style-src-elem': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'media-src': ["'self'", 'blob:'],

  // Required for WebWorker/three.js/wasm
  'worker-src': ["'self'", 'blob:'],

  'child-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]

  // Must be set via server headers
  // 'frame-ancestors': ["'none'"]

  // "upgrade-insecure-requests": [] //If needed in the web version
};

export const DEV_CSP: TCspRulles = {
  ...BASE_CSP,
  //   // TODO DESKTOP: Can we have ports from config (or env)?
  'connect-src': [...BASE_CSP['connect-src']!, 'http://localhost:5173', 'ws://localhost:5173']
};

export const PROD_CSP: TCspRulles = {
  ...BASE_CSP,
  'connect-src': ["'self'"]
  // maybe add 'upgrade-insecure-requests' as a separate plugin directive, if it supports
};
