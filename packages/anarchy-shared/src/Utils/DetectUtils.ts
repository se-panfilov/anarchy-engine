import { BrowserBrand, BrowserEngine, OperatingSystem } from '@Anarchy/Shared/Constants';
import type { TBrowserBrandVersion, TBrowserInfo } from '@Anarchy/Shared/Models';

const { Windows, Linux, Android, iOS, macOS, Unknown: UnknownOs } = OperatingSystem;
const { Chrome, Chromium, Edge, Firefox, Opera, Safari, Unknown: UnknownBrand } = BrowserBrand;
const { Blink, Gecko, WebKit, Unknown: UnknownEngine } = BrowserEngine;

const OS_PATTERNS = [
  { userAgent: /Windows NT/i, platform: /Windows/i, name: Windows },
  { userAgent: /Android/i, platform: /Android/i, name: Android },
  { userAgent: /iPhone|iPad|iPod/i, platform: /iOS|iPad|iPhone/i, name: iOS },
  { userAgent: /Mac OS X|Macintosh/i, platform: /mac/i, name: macOS },
  { userAgent: /Linux/i, platform: /Linux/i, name: Linux }
];

const BROWSER_PATTERNS = [
  { pattern: /Edg\/(\d+[\w.-]+)/, brand: Edge, engine: Blink },
  { pattern: /OPR\/(\d+[\w.-]+)/, brand: Opera, engine: Blink },
  { pattern: /Chrome\/(\d+[\w.-]+)/, brand: Chrome, engine: Blink, exclude: /Chromium/i },
  { pattern: /Chromium\/(\d+[\w.-]+)/, brand: Chromium, engine: Blink },
  { pattern: /Firefox\/(\d+[\w.-]+)/, brand: Firefox, engine: Gecko }
];

const detectOs = (input: string, isUserAgent: boolean = true): OperatingSystem => {
  const patternKey: 'userAgent' | 'platform' = isUserAgent ? 'userAgent' : 'platform';
  return OS_PATTERNS.find((os) => os[patternKey].test(input))?.name || (isUserAgent ? UnknownOs : input);
};

const getEngineFromUserAgent = (userAgent: string): TBrowserInfo['engine'] => {
  if (/Chrome|Chromium|Edg|OPR/i.test(userAgent)) return Blink;
  if (/AppleWebKit/i.test(userAgent)) return WebKit;
  if (/Gecko\/\d/i.test(userAgent) && /Firefox\/\d/i.test(userAgent)) return Gecko;
  return UnknownEngine;
};

const fromUserAgent = (userAgent: string): Pick<TBrowserInfo, 'brand' | 'version' | 'os' | 'engine' | 'isMobile'> => {
  const isMobile: boolean = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  const os: OperatingSystem = detectOs(userAgent);

  // Find matching browser pattern
  const matchedPattern = BROWSER_PATTERNS.find(({ pattern, exclude }) => pattern.test(userAgent) && (!exclude || !exclude.test(userAgent)));

  if (matchedPattern) {
    const version: string = userAgent.match(matchedPattern.pattern)?.[1] ?? 'unknown';
    return { brand: matchedPattern.brand, version, os, engine: matchedPattern.engine, isMobile };
  }

  // Safari special case
  if (/Safari\/\d/.test(userAgent) && !/Chrome|Chromium|Edg|OPR/.test(userAgent)) {
    const version: string = /Version\/(\d+[\w.-]+)/.test(userAgent) ? RegExp.$1 : 'unknown';
    return { brand: Safari, version, os, engine: WebKit, isMobile };
  }

  return { brand: UnknownBrand, version: 'unknown', os, engine: getEngineFromUserAgent(userAgent), isMobile };
};

export async function getBrowserInfo(): Promise<TBrowserInfo> {
  const userAgent = navigator.userAgent ?? '';
  const hint = (navigator as any).userAgentData;

  // Try User-Agent Client Hints first (modern Chromium browsers)
  if (hint?.getHighEntropyValues) {
    try {
      const brands: TBrowserBrandVersion[] = (hint.brands ?? []).map((b: any) => ({
        brand: b.brand,
        version: b.version
      }));

      const highEntropy = await hint.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model', 'uaFullVersion']);

      const primaryBrand = brands.find((b: TBrowserBrandVersion) => /^(Chrom(e|ium)|Google Chrome|Microsoft Edge|Opera|Brave|Vivaldi)$/i.test(b.brand)) ??
        brands[0] ?? { brand: 'Chromium', version: '' };

      return {
        brand: primaryBrand.brand,
        version: highEntropy?.uaFullVersion || primaryBrand.version || 'unknown',
        engine: Blink,
        os: detectOs(highEntropy?.platform ?? hint.platform ?? 'Unknown', false),
        isMobile: !!hint.mobile,
        model: highEntropy?.model,
        architecture: highEntropy?.architecture,
        fullVersionList: brands,
        userAgent
      };
    } catch {
      // Fall through to User-Agent parsing
    }
  }

  // Fallback to User-Agent string parsing
  return { ...fromUserAgent(userAgent), userAgent };
}

export async function getBrowserInfoString(): Promise<string> {
  const browserInfo: TBrowserInfo = await getBrowserInfo();
  const brands: string | undefined = browserInfo.fullVersionList?.map((b: TBrowserBrandVersion): string => `${b.brand} ${b.version}`).join(', ');
  return [
    `${browserInfo.brand} ${browserInfo.version}`,
    `engine=${browserInfo.engine}`,
    `os=${browserInfo.os}`,
    browserInfo.isMobile ? 'mobile' : 'desktop',
    browserInfo.architecture ? `arch=${browserInfo.architecture}` : '',
    browserInfo.model ? `model=${browserInfo.model}` : '',
    brands ? `brands=[${brands}]` : ''
  ]
    .filter(Boolean)
    .join(' | ');
}
