import type { TFsmConfig, TFsmParams } from '@/Engine/Fsm/Models';

export function configToParamsFsm(config: TFsmConfig): TFsmParams | never {
  if (hasFunctions(config)) throw new Error('Config must not contains functions');

  if (config.transitions.every((t): boolean => t.length !== 3)) throw new Error('Transitions must be an array of 3 elements');

  return {
    ...config,
    transitions: config.transitions as TFsmParams['transitions']
  };
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
