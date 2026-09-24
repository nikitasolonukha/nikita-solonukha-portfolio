import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = path.resolve(fileURLToPath(new URL('../site/', import.meta.url)));
const review = path.resolve(fileURLToPath(new URL('../review/', import.meta.url)));
const paths = {
  external: 'M5 19 19 5M8 5h11v11',
  back: 'M19 12H5M11 6l-6 6 6 6',
  up: 'M12 19V5M6 11l6-6 6 6',
};
const icon = kind => `<svg class="inline-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="${paths[kind]}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const arrow = /[↗↖←↑][\uFE0E\uFE0F]?/gu;
let replaced = 0;

for (const directory of [site, review]) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    const file = path.join(directory, entry.name);
    const source = await fs.readFile(file, 'utf8');
    let result = source.replace(/<(a|button)\b[^>]*>[\s\S]*?<\/\1>/gu, element => element.replace(arrow, glyph => {
      replaced++;
      return icon(glyph === '←' ? 'back' : glyph === '↑' ? 'up' : 'external');
    }));
    // A few glyphs also appear in static visual labels inside portfolio cases.
    if (directory === site) result = result.replace(arrow, glyph => {
      replaced++;
      return icon(glyph === '←' ? 'back' : glyph === '↑' ? 'up' : 'external');
    });
    if (result !== source) await fs.writeFile(file, result);
  }
}

const cssFile = path.join(site, 'styles.css');
const css = await fs.readFile(cssFile, 'utf8');
const unicodePseudo = 'content:"↗";';
if (css.includes(unicodePseudo)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="${paths.external}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  await fs.writeFile(cssFile, css.replace(unicodePseudo, `content:"";width:24px;height:24px;background-image:url("${dataUrl}");background-size:contain;background-repeat:no-repeat;`));
}

console.log(`Replaced ${replaced} navigation arrows in static HTML`);
