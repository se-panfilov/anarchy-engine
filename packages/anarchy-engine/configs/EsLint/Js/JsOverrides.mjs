export const JsOverrides = [
  {
    // files: ['packages/anarchy-engine/src/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@hellpig/anarchy-engine',
              message: "Please import a certain module instead of a whole folder, e.g. '@hellpig/anarchy-engine/Foo' instead of '@hellpig/anarchy-engine'"
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
