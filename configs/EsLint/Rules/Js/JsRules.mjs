export const JsRules = {
  'consistent-return': 'error',
  'no-restricted-syntax': [
    'error',
    { selector: "MethodDefinition[kind='set']", message: 'Property setters are not allowed' },
    { selector: "MethodDefinition[kind='get']", message: 'Property getters are not allowed' },
    { selector: "Property[kind='set']", message: 'Property setters are not allowed in object literals' },
    { selector: "Property[kind='get']", message: 'Property getters are not allowed in object literals' }
  ]
};
