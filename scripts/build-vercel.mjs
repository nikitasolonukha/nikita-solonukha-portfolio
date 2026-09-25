import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = path.resolve(root, 'dist');
if (output !== path.join(root, 'dist') || !output.startsWith(root + path.sep)) {
  throw new Error('Unsafe output path');
}

await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

const copyTree = async (source, destination, exclude = new Set()) => {
  await fs.mkdir(destination, { recursive: true });
  for (const entry of await fs.readdir(source, { withFileTypes: true })) {
    if (exclude.has(entry.name)) continue;
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyTree(from, to, exclude);
    else if (entry.isFile()) await fs.copyFile(from, to);
  }
};

await fs.copyFile(path.join(root, 'index.html'), path.join(output, 'index.html'));
await copyTree(path.join(root, 'site'), path.join(output, 'site'), new Set(['qa']));
await copyTree(path.join(root, 'review'), path.join(output, 'review'));
await copyTree(path.join(root, 'portfolio'), path.join(output, 'portfolio'));

const textExtensions = new Set(['.html', '.css', '.js', '.json']);
const oldOrigin = 'https://nikitasolonukha.github.io/nikita-solonukha-portfolio';
const vercelOrigin = 'https://nikita-solonukha-portfolio.vercel.app';
const assetVersion = '20260925-desktop-motion';
const versionedAssets = /\b(styles\.css|editorial\.css|motion\.css|app\.js|motion\.js|public-final\.css)(?:\?v=[^"'#\s<>]*)?/g;
const referencedProjects = new Set();
const scan = async directory => {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) { await scan(filename); continue; }
    if (!entry.isFile() || !textExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    if (entry.name.endsWith('.json') && filename !== path.join(output, 'portfolio', 'data.json')) continue;
    const original = await fs.readFile(filename, 'utf8');
    let source = original.replaceAll(oldOrigin, vercelOrigin);
    if (filename.endsWith('.html')) {
      source = source.replace(versionedAssets, (_, asset) => `${asset}?v=${assetVersion}`);
    }
    if (source !== original) await fs.writeFile(filename, source);
    for (const match of source.matchAll(/projects\/[\p{L}\p{N}_./% -]+/gu)) {
      const relative = decodeURIComponent(match[0].split(/[?#]/, 1)[0].trimEnd());
      if (!relative.startsWith('projects/') || relative.includes('..')) continue;
      referencedProjects.add(relative);
    }
  }
};
await scan(output);

let bytes = 0;
const missing = [];
for (const relative of referencedProjects) {
  const from = path.join(root, relative);
  const to = path.join(output, relative);
  try {
    const stat = await fs.stat(from);
    if (!stat.isFile()) continue;
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.copyFile(from, to);
    bytes += stat.size;
  } catch (error) {
    if (error.code === 'ENOENT') missing.push(relative);
    else throw error;
  }
}
if (missing.length) console.warn(`Skipped ${missing.length} stale or templated references`);
console.log(`Vercel export: ${referencedProjects.size} project files, ${(bytes / 1024 / 1024).toFixed(1)} MiB`);
