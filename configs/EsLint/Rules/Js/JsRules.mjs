export const JsRules = {
  'consistent-return': 'error',
  // TODO 10-1-0: EsLiont fix:  simple-import-sort/imports
  // 'simple-import-sort/imports': 'error',
  // 'simple-import-sort/exports': 'error',
  'no-restricted-syntax': [
    'error',
    { selector: "MethodDefinition[kind='set']", message: 'Property setters are not allowed' },
    { selector: "MethodDefinition[kind='get']", message: 'Property getters are not allowed' },
    { selector: "Property[kind='set']", message: 'Property setters are not allowed in object literals' },
    { selector: "Property[kind='get']", message: 'Property getters are not allowed in object literals' }
  ]
};
