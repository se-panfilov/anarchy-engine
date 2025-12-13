// TODO 18-0-0: MONO: Make sure this rules work
// TODO 18-0-0: MONO: The "no-restricted-imports"  rule is only for engine, exclude from other packages configs
export const JsOverrides = [
  {
    files: ['packages/engine/src/**/*'],
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
