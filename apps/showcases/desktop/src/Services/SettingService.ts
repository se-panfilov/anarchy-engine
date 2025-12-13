import Store from 'electron-store';

type TDesktopAppSettings = Readonly<{ screen: TScreenSettings }>;
type TScreenSettings = Readonly<{
  resolution: { width: number; height: number };
  fullscreen: boolean;
}>;

const schema = {
  resolution: {
    type: 'object',
    properties: {
      width: { type: 'number' },
      height: { type: 'number' }
    },
    default: { width: 1024, height: 768 }
  },
  fullscreen: { type: 'boolean', default: false }
};

const settingsStore = new Store<TDesktopAppSettings>({ schema });

export function getSettings(): TDesktopAppSettings {
  return {
    screen: settingsStore.get('fullscreen')
  };
}

export function updateSettings(patch: Partial<TDesktopAppSettings>): void {
  for (const key of Object.keys(patch)) {
    settingsStore.set(key as keyof TDesktopAppSettings, patch[key as keyof TDesktopAppSettings]!);
  }
}
