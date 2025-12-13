import { Project, SyntaxKind } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: './tsconfig.json'
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

for (const file of files) {
  const spreads = file.getDescendantsOfKind(SyntaxKind.SpreadAssignment);

  for (const spread of spreads) {
    const expr = spread.getExpression();
    if (!expr) continue;

    const type = expr.getType();
    if (hasNoSpreadBrand(type)) {
      const { line, column } = file.getLineAndColumnAtPos(spread.getStart());
      const filePath = file.getFilePath();
      console.warn(`🚫 Spread operator used on "__noSpreadBrand" branded object (creation of a copy by mistake) at ${filePath}:${line}:${column}`);
      violationCount++;
    }
  }
}

if (violationCount > 0) {
  console.error(`❌ Found ${violationCount} spread violation(s).`);
  process.exit(1);
} else {
  console.log('✅ No spread violations found.');
}
