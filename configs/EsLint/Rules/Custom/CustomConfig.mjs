import { CustomRules as rules } from './CustomRules.mjs';
import objectAssignMaxArgs from './Implementation/object-assign-max-args.mjs';

export const CustomConfig = [
  {
    rules,
    plugins: {
      custom: {
        rules: {
          'object-assign-max-args': objectAssignMaxArgs
        }
      }
    }
  }
];
