import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type {
  TPhysicsBodyFactory,
  TPhysicsBodyParams,
  TPhysicsPresetConfig,
  TPhysicsPresetParams,
  TPhysicsPresetRegistry,
  TPhysicsPresetsService,
  TWithPresetNamePhysicsBodyConfig
} from '@/Engine/Physics/Models';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics/Utils';
import type { TOptional } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function PhysicsPresetsService(registry: TPhysicsPresetRegistry): TPhysicsPresetsService {
  const disposable: ReadonlyArray<TDisposable> = [registry];
  const abstractService: TAbstractService = AbstractService(disposable);

  const addPresets = (presets: ReadonlyArray<TPhysicsPresetParams>): void => presets.forEach((preset: TPhysicsPresetParams) => registry.add(preset.name, preset));
  const addPresetsFromConfig = (presets: ReadonlyArray<TPhysicsPresetConfig>): void => addPresets(presets.map(configToParamsPreset));

  const getPresetByName = (name: string): TPhysicsPresetParams | undefined => registry.findByKey(name);

  function getMergedConfigWithPresetParams(config: TWithPresetNamePhysicsBodyConfig, factory: TPhysicsBodyFactory): TPhysicsBodyParams | never {
    const { presetName, ...rest } = config;
    const ownParams: TPhysicsBodyParams = factory.configToParams(rest);

    let presetParams: TPhysicsPresetParams | TOptional<TPhysicsPresetParams> | undefined = {};
    if (isDefined(presetName)) {
      presetParams = getPresetByName(presetName);
      if (isNotDefined(presetParams)) throw new Error(`Physics preset not found: "${presetName}"`);
    }

    const fullParams: TPhysicsBodyParams = { ...ownParams };
    if (!isPhysicsBodyParamsComplete(fullParams)) throw new Error('Cannot create physics body: params are lacking of mandatory fields');

    return { ...presetParams, ...fullParams };
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    addPresets,
    addPresetsFromConfig,
    getPresetByName,
    getMergedConfigWithPresetParams,
    getRegistry: (): TPhysicsPresetRegistry => registry
  });
}
