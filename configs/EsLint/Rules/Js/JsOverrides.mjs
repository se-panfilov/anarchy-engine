export const JsOverrides = {
  files: ['src/Engine/**/*'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@/Engine',
            message: "Please import a certain module instead of a whole folder, e.g. '@/Engine/Foo' instead of '@/Engine'"
          },
          {
            name: '@Engine',
            message: "Please import a certain module instead of a whole folder, e.g. '@Engine/Foo' instead of '@Engine'"
          }
        ]
      }
    ]
  }
};
