/**
 * Generates ESLint `no-restricted-imports` rules for a package.
 *
 * Enforces two invariants:
 * 1. Only the package's own `@Anarchy/*` alias is allowed (foreign aliases are banned).
 * 2. The package's own `@hellpig/anarchy-*` npm name is banned (use the internal alias instead).
 *
 * @param {string} ownAlias - The package's own internal alias, e.g. '@Anarchy/Engine'
 * @param {string} ownNpmName - The package's own npm name, e.g. '@hellpig/anarchy-engine'
 * @returns {object} ESLint flat config object
 */
export function createInternalAliasRules(ownAlias, ownNpmName) {
    const allInternalAliases = [
        '@Anarchy/Engine',
        '@Anarchy/I18N',
        '@Anarchy/Legal',
        '@Anarchy/Shared',
        '@Anarchy/Tracking'
    ];

    const foreignAliases = allInternalAliases
        .filter((alias) => alias !== ownAlias)
        .map((alias) => ({
            name: alias,
            message: `"${alias}" is an internal alias of another package. Use the npm name instead.`
        }));

    const foreignAliasPatterns = allInternalAliases
        .filter((alias) => alias !== ownAlias)
        .map((alias) => ({
            group: [`${alias}/*`],
            message: `"${alias}/*" is an internal alias of another package. Use the npm name instead.`
        }));

    return {
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        ...foreignAliases,
                        {
                            name: ownNpmName,
                            message: `Use the internal alias "${ownAlias}" instead of the npm name "${ownNpmName}" within this package.`
                        }
                    ],
                    patterns: [
                        ...foreignAliasPatterns,
                        {
                            group: [`${ownNpmName}/*`],
                            message: `Use the internal alias "${ownAlias}/*" instead of "${ownNpmName}/*" within this package.`
                        }
                    ]
                }
            ]
        }
    };
}
