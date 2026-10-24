// Copies the self-hosted Be Vietnam Pro files (Vietnamese and Latin subsets, weights 400 and 600)
// into public/fonts/ before dev and build. The files come from @fontsource/be-vietnam-pro
// (SIL Open Font License 1.1) and are not committed.
import { copyFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const pkg = dirname(require.resolve('@fontsource/be-vietnam-pro/package.json'));
const out = fileURLToPath(new URL('../public/fonts/', import.meta.url));
mkdirSync(out, { recursive: true });
for (const subset of ['vietnamese', 'latin']) {
  for (const weight of [400, 600]) {
    const name = `be-vietnam-pro-${subset}-${weight}-normal.woff2`;
    copyFileSync(join(pkg, 'files', name), join(out, name));
  }
}
copyFileSync(join(pkg, 'LICENSE'), join(out, 'OFL.txt'));
