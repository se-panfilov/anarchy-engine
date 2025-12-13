export type TBrandVersion = Readonly<{ brand: string; version: string }>;

export type TBrowserInfo = Readonly<{
  brand: string;
  version: string;
  engine: 'Blink' | 'WebKit' | 'Gecko' | 'Unknown';
  os: string;
  isMobile: boolean;
  model?: string;
  architecture?: string;
  fullVersionList?: ReadonlyArray<TBrandVersion>;
  userAgent?: string;
}>;

const getOsFromUserAgent = (userAgent: string): string => {
  if (/Windows NT/i.test(userAgent)) return 'Windows';
  if (/Android/i.test(userAgent)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
  if (/Mac OS X|Macintosh/i.test(userAgent)) return 'macOS';
  if (/Linux/i.test(userAgent)) return 'Linux';
  return 'Unknown';
};

const getEngineFromUserAgent = (userAgent: string): TBrowserInfo['engine'] => {
  if (/AppleWebKit/i.test(userAgent) && !/Chrome|Chromium|Edg|OPR/i.test(userAgent)) return 'WebKit'; // Safari
  if (/Gecko\/\d/i.test(userAgent) && /Firefox\/\d/i.test(userAgent)) return 'Gecko';
  if (/Chrome|Chromium|Edg|OPR/i.test(userAgent)) return 'Blink';
  return 'Unknown';
};

const fromUserAgent = (userAgent: string): Pick<TBrowserInfo, 'brand' | 'version' | 'os' | 'engine' | 'isMobile'> => {
  const isMobile: boolean = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  if (/Edg\/(\d+[\w.-]+)/.test(userAgent)) return { brand: 'Edge', version: RegExp.$1, os: getOsFromUserAgent(userAgent), engine: 'Blink', isMobile };
  if (/OPR\/(\d+[\w.-]+)/.test(userAgent)) return { brand: 'Opera', version: RegExp.$1, os: getOsFromUserAgent(userAgent), engine: 'Blink', isMobile };
  if (/Chrome\/(\d+[\w.-]+)/.test(userAgent) && !/Chromium/i.test(userAgent)) return { brand: 'Chrome', version: RegExp.$1, os: getOsFromUserAgent(userAgent), engine: 'Blink', isMobile };
  if (/Chromium\/(\d+[\w.-]+)/.test(userAgent)) return { brand: 'Chromium', version: RegExp.$1, os: getOsFromUserAgent(userAgent), engine: 'Blink', isMobile };
  if (/Firefox\/(\d+[\w.-]+)/.test(userAgent)) return { brand: 'Firefox', version: RegExp.$1, os: getOsFromUserAgent(userAgent), engine: 'Gecko', isMobile };
  if (/Safari\/\d/.test(userAgent) && !/Chrome|Chromium|Edg|OPR/.test(userAgent)) {
    const version: string = /Version\/(\d+[\w.-]+)/.test(userAgent) ? RegExp.$1 : '';
    return { brand: 'Safari', version: version || 'unknown', os: getOsFromUserAgent(userAgent), engine: 'WebKit', isMobile };
  }

  return { brand: 'Unknown', version: 'unknown', os: getOsFromUserAgent(userAgent), engine: getEngineFromUserAgent(userAgent), isMobile };
};

export async function getBrowserInfo(): Promise<TBrowserInfo> {
  const userAgent = navigator.userAgent ?? '';
  const hint = (navigator as any).userAgentData;

  // 1) UA-CH путь (самый надёжный для Chromium-браузеров)
  if (hint && typeof hint.getHighEntropyValues === 'function') {
    try {
      const brands: ReadonlyArray<TBrandVersion> = (hint.brands ?? hint.uaList ?? []).map((b: any) => ({ brand: b.brand, version: b.version }));

      const high = await hint.getHighEntropyValues?.(['platform', 'platformVersion', 'architecture', 'model', 'uaFullVersion']);
      const primary = brands.find((b) => /^(Chrom(e|ium)|Google Chrome|Microsoft Edge|Opera|Brave|Vivaldi)$/i.test(b.brand)) ?? brands[0] ?? { brand: 'Chromium', version: high?.uaFullVersion ?? '' };

      // OS из UA-CH
      const platform: string = String(high?.platform ?? hint.platform ?? 'Unknown');
      const os: string = /Windows/i.test(platform)
        ? 'Windows'
        : /mac/i.test(platform)
          ? 'macOS'
          : /Android/i.test(platform)
            ? 'Android'
            : /iOS|iPad|iPhone/.test(platform)
              ? 'iOS'
              : /Linux/i.test(platform)
                ? 'Linux'
                : platform;

      // Движок — Blink для всех UA-CH браузеров сегодня
      const engine: TBrowserInfo['engine'] = 'Blink';

      const isMobile = !!hint.mobile;

      return {
        brand: primary.brand,
        version: high?.uaFullVersion || primary.version || 'unknown',
        engine,
        os,
        isMobile,
        model: high?.model || undefined,
        architecture: high?.architecture || undefined,
        fullVersionList: brands,
        userAgent
      };
    } catch {
      //go to fallback
    }
  }

  // Fallback
  const base = fromUserAgent(userAgent);
  return { ...base, userAgent };
}

export async function getBrowserInfoString(): Promise<string> {
  const i = await getBrowserInfo();
  const brands = i.fullVersionList?.map((b) => `${b.brand} ${b.version}`).join(', ');
  return [
    `${i.brand} ${i.version}`,
    `engine=${i.engine}`,
    `os=${i.os}`,
    i.isMobile ? 'mobile' : 'desktop',
    i.architecture ? `arch=${i.architecture}` : '',
    i.model ? `model=${i.model}` : '',
    brands ? `brands=[${brands}]` : ''
  ]
    .filter(Boolean)
    .join(' | ');
}
