export const DesktopAppPaths: Record<string, string | undefined> = {
  'linux:arm64': process.env.DESKTOP_E2E_LINUX_APP_ARM64_PATH,
  'linux:x64': process.env.DESKTOP_E2E_LINUX_APP_X64_PATH,
  'mac:arm64': process.env.DESKTOP_E2E_MAC_APP_ARM64_PATH,
  'mac:x64': process.env.DESKTOP_E2E_MAC_APP_X64_PATH,
  'win:arm64': process.env.DESKTOP_E2E_WIN_APP_ARM64_PATH,
  'win:x64': process.env.DESKTOP_E2E_WIN_APP_X64_PATH
};
