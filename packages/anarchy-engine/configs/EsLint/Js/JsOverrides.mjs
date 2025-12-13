export const JsOverrides = [
  {
    // files: ['packages/anarchy-engine/src/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@Engine',
              message: "Please import a certain module instead of a whole folder, e.g. '@Engine/Foo' instead of '@Engine'"
            },
            {
              name: 'lodash',
              message: 'Please import lodash-es instead of lodash. This helps to reduce bundle size by importing only the necessary functions.'
            }
          ]
        }
      ]
    }
  }
];
