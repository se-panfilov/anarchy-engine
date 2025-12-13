// eslint-rules/object-assign-max-args.js
/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Object.assign with more than 3 arguments'
    },
    schema: [], // no options
    messages: {
      tooManyArgs: 'Avoid using Object.assign with more than 3 arguments. Split it into smaller steps.'
    }
  },
  create(context) {
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
          if (args.length > 3) {
            context.report({
              node,
              messageId: 'tooManyArgs'
            });
          }
        }
      }
    };
  }
};
