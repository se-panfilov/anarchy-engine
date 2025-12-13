import { Project, SyntaxKind, Node } from 'ts-morph';
import path from 'path';

const project = new Project({
  tsConfigFilePath: './tsconfig.json'
  // manipulationSettings: {
  //   quoteKind: '"'
  // }
});

const UNSAFE_FUNCTIONS = ['Object.keys', 'Object.entries', 'Reflect.ownKeys'];

const isUnsafeCall = (callExpr) => {
  const expr = callExpr.getFirstChildByKind(SyntaxKind.PropertyAccessExpression) ?? callExpr.getFirstChildByKind(SyntaxKind.ElementAccessExpression);

  if (!expr) return false;

  const objectName = (expr.getFirstChildByKind(SyntaxKind.Identifier) || expr.getFirstChild())?.getText();
  const methodName = expr.getLastChild()?.getText().replace(/['"]/g, '');

  if (!objectName || !methodName) return false;

  return UNSAFE_FUNCTIONS.includes(`${objectName}.${methodName}`);
};

const isSafeLiteral = (arg) => {
  if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
    return !arg.getChildren().some((child) => child.getKind() === SyntaxKind.SpreadAssignment);
  }
  if (arg.getKind() === SyntaxKind.ArrayLiteralExpression) {
    return true;
  }
  return false;
};

const isKnownSafeType = (arg) => {
  try {
    const type = arg.getType();
    const props = type.getProperties();
    return props.length > 0;
  } catch {
    return false;
  }
};

const problems = [];

for (const sourceFile of project.getSourceFiles()) {
  const callExprs = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  for (const callExpr of callExprs) {
    if (!isUnsafeCall(callExpr)) continue;

    const args = callExpr.getArguments();
    const arg = args[0];
    if (!arg) continue;

    if (isSafeLiteral(arg)) continue;
    if (arg.getType().isArray()) continue;
    if (isKnownSafeType(arg)) continue;

    problems.push({
      file: sourceFile.getFilePath(),
      line: arg.getStartLineNumber(),
      code: callExpr.getText()
    });
  }
}

if (problems.length === 0) {
  console.log('✅ No mangle-unsafe patterns found');
} else {
  console.log(`❌ Found ${problems.length} potentially unsafe usages:`);
  for (const prob of problems) {
    console.log(`${prob.file}:${prob.line}\n→ ${prob.code}\n`);
  }
}
