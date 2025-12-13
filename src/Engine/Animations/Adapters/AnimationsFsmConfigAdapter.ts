import type { TAnimationsFsmConfig, TAnimationsFsmParams } from '@/Engine/Animations/Models';

export function configToParamsAnimationsFsm(config: TAnimationsFsmConfig): TAnimationsFsmParams | never {
  if (hasFunctions(config)) throw new Error('Config must not contains functions');

  return config;
}

function hasFunctions(obj: any): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key in obj) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (typeof obj[key] === 'function') {
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (hasFunctions(obj[key])) return true;
    }
  }
  return false;
}
