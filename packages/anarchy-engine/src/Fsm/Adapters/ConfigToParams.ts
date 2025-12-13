import type { TFsmConfig, TFsmEvents, TFsmParams, TFsmSource } from '@Anarchy/Engine/Fsm/Models';

export function configToParamsFsm(config: TFsmConfig): TFsmParams | never {
  if (hasFunctions(config)) throw new Error('Config must not contains functions');

  if (config.transitions.every((t: ReadonlyArray<TFsmSource | TFsmEvents>): boolean => t.length !== 3)) throw new Error('Transitions must be an array of 3 elements');

  return {
    ...config,
    transitions: config.transitions as TFsmParams['transitions']
  };
}

function hasFunctions(obj: any): boolean {
  // eslint-disable-next-line functional/no-loop-statements
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      return true;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (hasFunctions(obj[key])) return true;
    }
  }
  return false;
}
