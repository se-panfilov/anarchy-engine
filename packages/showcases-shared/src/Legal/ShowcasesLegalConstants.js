export const ShowcasesSupportedPlatforms = {
  Web: 'Modern desktop/mobile browsers with WebGL 2 support (Chromium-based, Firefox, Safari or equivalent)',
  Desktop:
    'Windows 10/11 (64-bit), macOS 12+ (Intel/Apple Silicon), and mainstream Linux x86_64 distributions (e.g., Ubuntu 20.04+), subject to GPU/driver support for WebGL 2 / hardware acceleration',
  Mobile: 'Android 8.0+ and iOS/iPadOS 14+ devices with system WebGL 2 support in the WebView/runtime'
};

export const ShowcasesSystemRequirements = {
  Web: {
    Minimum: `- **Browser**: a current-generation browser with WebGL 2 enabled (JavaScript and hardware acceleration on).
- **CPU**: 64-bit dual-core.
- **Memory**: 4 GB RAM.
- **GPU**: integrated or discrete GPU with WebGL 2 (≈ OpenGL ES 3.0) support; ~1 GB graphics memory available.
- **Storage**: 500 MB free for cached assets.
- **Display**: 1280×720.
- **Input**: keyboard/mouse or compatible controller/touchpad.`,
    Recommended: `- **Browser**: a current-generation browser with WebGL 2 enabled (JavaScript and hardware acceleration on).
- **CPU**: 4-core (or better).
- **Memory**: 8 GB RAM.
- **GPU**: modern integrated/discrete GPU with robust WebGL 2; ~2 GB graphics memory.
- **Storage**: 500 MB free for cached assets.
- **Display**: 1920×1080.
- **Input**: keyboard/mouse or compatible controller/touchpad.`
  },
  Desktop: {
    Minimum: `- **OS**: Windows 10/11 (64-bit), macOS 12+ (Intel/Apple Silicon), or Linux x86_64 (e.g., Ubuntu 20.04+).
- **CPU**: x86_64 dual-core or Apple Silicon.
- **Memory**: 4 GB RAM.
- **GPU**: hardware-accelerated graphics with WebGL 2 (e.g., OpenGL 3.3/D3D11 class); ~1 GB graphics memory.
- **Storage**: 1–1.5 GB free (app + caches/logs).
- **Display**: 1280×720.
- **Input**: keyboard/mouse or compatible controller/touchpad.`,
    Recommended: `- **OS**: Windows 10/11 (64-bit), macOS 12+ (Intel/Apple Silicon), or Linux x86_64 (e.g., Ubuntu 20.04+).
- **CPU**: 4-core (or better).
- **Memory**: 8 GB RAM.
- **GPU**: modern integrated/discrete GPU with robust WebGL 2; ~2 GB graphics memory.
- **Storage**: 2 GB free.
- **Display**: 1920×1080.
- **Input**: keyboard/mouse or compatible controller/touchpad.`
  },
  Mobile: {
    Minimum: `- **OS**: Android 8.0+ (API 26+) или iOS/iPadOS 14+.
- **Memory**: 3 GB RAM.
- **GPU**: device with system WebGL 2 support in WebView/runtime (Metal/ES3-class).
- **Storage**: 1 GB free.
- **Display**: 1280×720`,
    Recommended: `- **OS**: Android 11+ / iOS/iPadOS 15+.
- **Memory**: 4 GB RAM.
- **GPU**: modern mobile SoC (robust iGPU).
- **Storage**: 2 GB free.
- **Display**: 1280×720`
  }
};
