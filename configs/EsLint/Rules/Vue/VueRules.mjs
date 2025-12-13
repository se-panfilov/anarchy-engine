export const VueRules = {
  'vue/max-attributes-per-line': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always'
      }
    }
  ]
};
