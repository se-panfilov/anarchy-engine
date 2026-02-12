#!/usr/bin/env node

/**
 * Pre-release validation: checks that all self-referencing imports in .d.ts files
 * are resolvable via the package wildcard exports pattern.
 *
 * Specifically, this script detects:
 * 1. File-level self-references where dist/X.d.ts exists but dist/X/index.d.ts does not.
 *    These cannot be resolved by the wildcard export "./*" -> "./dist/X/index.d.ts".
 * 2. Missing directories - imports that do not resolve to any file at all.
 *
 * Usage:
 *   node scripts/release/check-dts-exports.mjs <package-dir> [dist-dir]
 *   e.g.: node scripts/release/check-dts-exports.mjs packages/anarchy-engine
 *   e.g.: node scripts/release/check-dts-exports.mjs apps/showcases-core dist-web
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const pkgDir = process.argv[2];
if (!pkgDir) {
  console.error('Usage: node scripts/release/check-dts-exports.mjs <package-dir> [dist-dir]');
  process.exit(1);
}

const distDirName = process.argv[3] || 'dist';

const pkgRoot = resolve(pkgDir);
const pkgJson = JSON.parse(readFileSync(join(pkgRoot, 'package.json'), 'utf8'));
const pkgName = pkgJson.name;
const distDir = join(pkgRoot, distDirName);

if (!existsSync(distDir)) {
  console.error(`${distDirName}/ directory not found in ${pkgRoot}. Run "npm run build" first.`);
  process.exit(1);
}

function collectDtsFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'packages') continue;
      results.push(...collectDtsFiles(full));
    } else if (entry.name.endsWith('.d.ts')) {
      results.push(full);
    }
  }
  return results;
}

const importRegex = /from\s+['"](@[^'"]+)['"]/g;

function extractSelfImports(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const imp = match[1];
    if (imp.startsWith(pkgName + '/')) {
      imports.push({
        file: filePath,
        importPath: imp,
        subpath: imp.slice(pkgName.length + 1)
      });
    }
  }
  return imports;
}

const dtsFiles = collectDtsFiles(distDir);
const allImports = dtsFiles.flatMap(extractSelfImports);
const uniqueSubpaths = [...new Set(allImports.map((i) => i.subpath))].sort();

const errors = [];

for (const subpath of uniqueSubpaths) {
  const indexPath = join(distDir, subpath, 'index.d.ts');
  const filePath = join(distDir, subpath + '.d.ts');

  if (existsSync(indexPath)) {
    continue;
  }

  if (existsSync(filePath)) {
    const refs = allImports.filter((i) => i.subpath === subpath);
    const parentBarrel = subpath.split('/').slice(0, -1).join('/');
    errors.push({
      type: 'file-level',
      subpath,
      parentBarrel,
      referencedFrom: refs.map((r) => r.file.replace(pkgRoot + '/', ''))
    });
  } else {
    const refs = allImports.filter((i) => i.subpath === subpath);
    errors.push({
      type: 'missing',
      subpath,
      referencedFrom: refs.map((r) => r.file.replace(pkgRoot + '/', ''))
    });
  }
}

console.log(`\nPackage: ${pkgName}`);
console.log(`Scanned: ${dtsFiles.length} .d.ts files`);
console.log(`Self-referencing imports: ${uniqueSubpaths.length} unique subpaths\n`);

if (errors.length === 0) {
  console.log('✅ All self-referencing imports are resolvable via wildcard exports.\n');
  process.exit(0);
} else {
  console.error(`❌ Found ${errors.length} unresolvable import(s):\n`);

  for (const err of errors) {
    if (err.type === 'file-level') {
      console.error(`  FILE-LEVEL: ${pkgName}/${err.subpath}`);
      console.error(`    ${distDirName}/${err.subpath}.d.ts exists, but ${distDirName}/${err.subpath}/index.d.ts does not.`);
      console.error(`    Fix: change source import to use barrel "${err.parentBarrel}" instead (means, you should import from index.ts file).`);
    } else {
      console.error(`  MISSING: ${pkgName}/${err.subpath}`);
      console.error(`    Neither ${distDirName}/${err.subpath}/index.d.ts nor ${distDirName}/${err.subpath}.d.ts exists.`);
    }
    console.error(`    Referenced from:`);
    for (const ref of err.referencedFrom) {
      console.error(`      - ${ref}`);
    }
    console.error('');
  }

  process.exit(1);
}
