import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { ElectronApplication, Page } from '@playwright/test';
import { _electron as electron } from '@playwright/test';
import { Architectures, DesktopAppPaths, Platforms } from '@Showcases/E2E/Constants';
import type { TDesktopAppLaunchResult } from '@Showcases/E2E/Models';
import fs from 'fs';

const VIEWPORT = { width: 800, height: 600 };

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

export async function launchPackagedElectronApp(): Promise<TDesktopAppLaunchResult> {
  const executablePath: string = resolveDesktopExecutablePath();
  if (!executablePath) throw new Error('[E2E] Cannot find path to the executable for the desktop app.');

  const args: Array<string> = [`--width=${VIEWPORT.width}`, `--height=${VIEWPORT.height}`, '--fullscreen=false', '--dev-tools=false'];
  console.log('[E2E] Desktop executable path:', executablePath);
  console.log('[E2E] Desktop args:', args.join(','));

  const electronApp: ElectronApplication = await electron.launch({
    executablePath,
    args,
    env: {
      ...process.env,
      // Optional flag for your main process to enable E2E mode
      E2E: '1'
    }
  });

  const page: Page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  // eslint-disable-next-line spellcheck/spell-checker
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('load');

  return { electronApp, page };
}

export function resolveDesktopExecutablePath(): string {
  const platform: Platforms = detectPlatformFromNode();
  const arch: Architectures = detectArchFromNode();

  const targetRaw = `${platform}:${arch}`;
  if (isNotDefined(DesktopAppPaths[targetRaw])) throw new Error(`[E2E] Unknown target platform("${targetRaw}")`);

  const e2eDir: string = path.resolve(__dirname, '..', '..'); // apps/showcases-e2e
  const absolutePath: string = path.resolve(e2eDir, DesktopAppPaths[targetRaw]);

  if (!fs.existsSync(absolutePath)) throw new Error(`[E2E] Failed to resolve executable for "${targetRaw}" (does not exist): ${absolutePath}`);

  return absolutePath;
}

function detectPlatformFromNode(): Platforms {
  switch (process.platform) {
    case 'win32':
      return Platforms.WIN;
    case 'darwin':
      return Platforms.MAC;
    case 'linux':
      return Platforms.LINUX;
    default:
      throw new Error(`[E2E] Unsupported process.platform: ${process.platform}`);
  }
}

function detectArchFromNode(): Architectures {
  if (process.arch === 'x64') return Architectures.X64;
  if (process.arch === 'arm64') return Architectures.ARM64;
  throw new Error(`[E2E] Unsupported process.arch: ${process.arch}`);
}

export async function waitFontsReady(page: Page): Promise<void> {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  await page.evaluate((): Promise<void> => new Promise<void>((r: (value: PromiseLike<void> | void) => void): number => requestAnimationFrame((): number => requestAnimationFrame((): void => r()))));
}

export async function waitResourcesReady(page: Page, timeout: number = 1000): Promise<void> {
  await page.waitForFunction((): boolean | undefined => !!(window as any)._isResourcesReady, { timeout });
}
