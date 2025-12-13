import type { ElectronApplication, Page } from '@playwright/test';
import { _electron as electron } from '@playwright/test';
import type { TDesktopAppLaunchResult } from '@Showcases/E2E/Models';

const VIEWPORT = { width: 800, height: 600 };

export async function launchPackagedElectronApp(): Promise<TDesktopAppLaunchResult> {
  const executablePath: string | undefined = process.env.DESKTOP_E2E_APP_PATH;
  if (!executablePath) throw new Error('DESKTOP_E2E_APP_PATH env variable is required for packaged Electron tests');

  const args = [`--width=${VIEWPORT.width}`, `--height=${VIEWPORT.height}`, '--fullscreen=false'];
  console.log('[E2E] Desktop app launched with args:', args.join(','));

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

  return { electronApp, page };
}
