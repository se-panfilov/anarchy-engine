// eslint-rules/object-assign-max-args.js
/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Object.assign with more than N arguments'
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxArgs: {
            type: 'number',
            minimum: 2
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      tooManyArgs: 'Avoid using Object.assign with more than {{max}} arguments. Split it into smaller steps.'
    }
  },
  create(context) {
    const options = context.options[0] || {};
    const maxArgs = typeof options.maxArgs === 'number' ? options.maxArgs : 3;

    return {
      CallExpression(node) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'Object' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'assign'
        ) {
          const args = node.arguments;
          if (args.length > maxArgs) {
            context.report({
              node,
              messageId: 'tooManyArgs',
              data: {
                max: maxArgs
              }
            });
          }
        }
      }
    };
  }
};
