import Ajv from 'ajv';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import ISceneConfigSchema from '@Engine/Schemas/ISceneConfig.json';

const ajv: Ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

// const schema = {
//   type: 'object',
//   properties: {
//     foo: { type: 'integer' },
//     bar: { type: 'string' }
//   },
//   required: ['foo'],
//   additionalProperties: false
// };

console.log(ISceneConfigSchema);

export function isValidSceneConfig(scene: ISceneConfig | unknown): scene is ISceneConfig {
  const validate = ajv.compile(ISceneConfigSchema);
  const valid: boolean = validate(scene);

  console.log('is valid:', valid);
  return valid;
}
