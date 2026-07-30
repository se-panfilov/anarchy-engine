import spellcheckOriginal from 'eslint-plugin-spellcheck';

// `eslint-plugin-spellcheck@0.0.20` is unmaintained and still calls the legacy
// `context.getSourceCode()` API, which was removed in ESLint 10 (only `context.sourceCode`
// remains). This thin compatibility layer restores `getSourceCode()` on the rule context
// so the plugin keeps working without patching `node_modules`.
const withCompat = (rule) => {
  const originalCreate = rule.create;

  return {
    ...rule,
    create(context) {
      if (typeof context.getSourceCode === 'function') {
        return originalCreate(context);
      }

      const compatContext = new Proxy(context, {
        get(target, prop, receiver) {
          if (prop === 'getSourceCode') {
            return () => target.sourceCode;
          }

          return Reflect.get(target, prop, receiver);
        }
      });

      return originalCreate(compatContext);
    }
  };
};

const rules = Object.fromEntries(Object.entries(spellcheckOriginal.rules).map(([name, rule]) => [name, withCompat(rule)]));

export const spellcheck = { ...spellcheckOriginal, rules };
