import { Project, SyntaxKind, Node } from 'ts-morph';

const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');

const project = new Project({
  tsConfigFilePath: './tsconfig.json',
  manipulationSettings: {
    quoteKind: '"'
  }
});

const files = project.getSourceFiles(['src/**/*.ts', 'src/**/*.tsx']);
const BRAND_FIELD_NAME = '__noSpreadBrand';

function hasNoSpreadBrand(type) {
  if (type.isUnion && type.isUnion()) {
    const unionTypes = type.types || [];
    return unionTypes.some((t) => t.getProperty && t.getProperty(BRAND_FIELD_NAME));
  }

  return !!(type.getProperty && type.getProperty(BRAND_FIELD_NAME));
}

let violationCount = 0;
let fixedCount = 0;

for (const file of files) {
  const objectLiterals = file.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression);

  for (const obj of objectLiterals) {
    const props = obj.getProperties();
    const first = props[0];

    if (!Node.isSpreadAssignment(first)) continue;

    const expr = first.getExpression();
    const type = expr.getType();

    if (!hasNoSpreadBrand(type)) continue;

    violationCount++;

    const otherProps = props
      .slice(1)
      .map((p) => p.getText())
      .join(',\n');

    if (shouldFix) {
      const replacement = `Object.assign(${expr.getText()}, {\n${otherProps}\n})`;

      obj.replaceWithText(replacement);
      fixedCount++;
    } else {
      const { line, column } = file.getLineAndColumnAtPos(obj.getStart());
      console.warn(`🚫 Spread operator used on "__noSpreadBrand" branded object (creation of a copy by mistake) at ${file.getFilePath()}:${line}:${column}`);
    }
  }

  if (shouldFix && fixedCount > 0) {
    file.saveSync();
  }
}

if (violationCount > 0) {
  if (shouldFix) {
    console.log(`🔧 Fixed ${fixedCount} branded spread violation(s).`);
    process.exit(0);
  } else {
    console.error(`❌ Found ${violationCount} spread violation(s).`);
    process.exit(1);
  }
} else {
  console.log('✅ No spread violations found.');
}
