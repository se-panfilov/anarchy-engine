// //Forbids spread operator for objects with __noSpreadBrand.
// export const NoSpread = {
//   meta: {
//     type: 'problem',
//     docs: {
//       description: 'Forbids spread operator for objects with __noSpreadBrand',
//       recommended: false
//     },
//     schema: []
//   },
//   create(context) {
//     const parserServices = context.parserServices;
//     if (!parserServices || !parserServices.program) {
//       return {};
//     }
//     const typeChecker = parserServices.program.getTypeChecker();
//
//     function hasNoSpreadBrand(type) {
//       return !!type.getProperty('__noSpreadBrand');
//     }
//
//     function checkSpread(node) {
//       const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.argument);
//       const type = typeChecker.getTypeAtLocation(tsNode);
//
//       if (hasNoSpreadBrand(type)) {
//         context.report({
//           node,
//           message: 'Spread operator is forbidden for objects with __noSpreadBrand.'
//         });
//       }
//     }
//
//     return {
//       SpreadElement: checkSpread
//     };
//   }
// };
// NoSpread.mjs

//Forbids spread operator for objects with __noSpreadBrand.
export const NoSpread = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbids spread operator for objects with __noSpreadBrand (JS-level check)',
      recommended: false
    },
    schema: []
  },
  create(context) {
    /**
     * Проверяет, содержит ли объектный литерал свойство __noSpreadBrand: true.
     * @param {ASTNode} node ObjectExpression
     * @returns {boolean}
     */
    function hasNoSpreadBrandInObject(node) {
      if (node.type !== 'ObjectExpression') return false;
      for (const prop of node.properties) {
        if (prop.type === 'Property' && !prop.computed) {
          let keyName = null;
          if (prop.key.type === 'Identifier') {
            keyName = prop.key.name;
          } else if (prop.key.type === 'Literal') {
            keyName = String(prop.key.value);
          }
          if (keyName === '__noSpreadBrand') {
            if (prop.value.type === 'Literal' && prop.value.value === true) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /**
     * Разворачивает узел, если он обёрнут в TSAsExpression или TSTypeAssertion.
     * @param {ASTNode} node
     * @returns {ASTNode}
     */
    function unwrapExpression(node) {
      if (node && (node.type === 'TSAsExpression' || node.type === 'TSTypeAssertion')) {
        return unwrapExpression(node.expression);
      }
      return node;
    }

    /**
     * Если узел — идентификатор, пытаемся найти его определение и проверить инициализатор.
     * @param {ASTNode} identifier Identifier
     * @returns {boolean}
     */
    function hasNoSpreadBrandInIdentifier(identifier) {
      const sourceCode = context.getSourceCode();
      let scope = sourceCode.scopeManager.acquire(identifier);
      if (!scope) {
        scope = sourceCode.scopeManager.globalScope;
      }
      const variable = scope.variables.find((v) => v.name === identifier.name);
      if (!variable) return false;
      for (const def of variable.defs) {
        if (def.node && def.node.init) {
          // Разворачиваем TS-обёртки
          let init = unwrapExpression(def.node.init);
          if (init && init.type === 'ObjectExpression') {
            if (hasNoSpreadBrandInObject(init)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function checkSpread(node) {
      const arg = node.argument;
      let found = false;
      if (arg.type === 'ObjectExpression') {
        found = hasNoSpreadBrandInObject(arg);
      } else if (arg.type === 'Identifier') {
        found = hasNoSpreadBrandInIdentifier(arg);
      }
      if (found) {
        context.report({
          node,
          message: 'Spread operator is forbidden for objects with __noSpreadBrand.'
        });
      }
    }

    return {
      SpreadElement: checkSpread
    };
  }
};
