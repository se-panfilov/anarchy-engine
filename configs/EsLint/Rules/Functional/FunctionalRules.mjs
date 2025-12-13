export const FunctionalRules = {
  'functional/functional-parameters': [
    'error',
    {
      allowRestParameter: true,
      allowArgumentsKeyword: false,
      enforceParameterCount: false
    }
  ],
  'functional/no-expression-statement': 'off',
  'functional/immutable-data': ['error', { ignoreMapsAndSets: true, ignoreAccessorPattern: ['state.**'] }],
  'functional/prefer-readonly-type': 'off', //deprecated
  'functional/prefer-immutable-types': 'off', //broken in the latest eslint
  // 'functional/prefer-immutable-types': [
  //   'error',
  //   {
  //     enforcement: 'None',
  //     parameters: {
  //       enforcement: 'ReadonlyShallow'
  //     }
  //   }
  // ],
  'functional/no-expression-statements': 'off',
  'functional/no-throw-statements': 'off',
  'functional/no-throw-statement': 'off',
  'functional/no-conditional-statements': 'off',
  'functional/no-mixed-types': 'off',
  'functional/no-let': 'off',
  'functional/no-mixed-type': 'off',
  'functional/no-conditional-statement': 'off', // TODO temp off (don't get this rule tbh)
  'functional/no-class': 'off',
  'functional/no-classes': 'off',
  'functional/readonly-type': ['error', 'generic'],
  'functional/no-this-expression': 'off',
  'functional/no-return-void': 'off' // TODO temp off (don't get this rule tbh)
};
