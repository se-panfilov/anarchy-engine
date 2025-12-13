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

const anarchyTrackingUrl = 'https://*.sentry.io' as const;
const anarchyTrackingUrlElectronPreload = 'sentry-ipc:' as const;

export const BASE_CSP: TCspRulles = {
  'default-src': ["'self'"],

  //No unsave-eval, no inline scripts/styles, but allow WASM eval.
  'script-src': ["'self'", "'wasm-unsafe-eval'"],
  'script-src-elem': ["'self'", "'wasm-unsafe-eval'"],

  'style-src': ["'self'", "'unsafe-inline'"],

  // A compromise for libs with inline styles
  'style-src-elem': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'blob:', anarchyTrackingUrl],
  'media-src': ["'self'", 'blob:'],

  // Required for WebWorker/three.js/wasm
  'worker-src': ["'self'", 'blob:'],

  'object-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'none'"] //When billing is added, change it to 'self' and the billing provider URL

  // Must be set via server headers
  // 'frame-ancestors': ["'none'"]

  // TODO Enable When we have HTTPS
  // 'upgrade-insecure-requests': []
};

export const DESKTOP_CSP: TCspRulles = {
  ...BASE_CSP,
  'img-src': ["'self'", 'data:', 'blob:', 'file:'],
  'font-src': ["'self'", 'data:', 'file:'],
  'connect-src': ["'self'", 'blob:', 'file:', anarchyTrackingUrl, anarchyTrackingUrlElectronPreload],
  'media-src': ["'self'", 'blob:', 'file:'],
  'worker-src': ["'self'", 'blob:', 'file:']
};
