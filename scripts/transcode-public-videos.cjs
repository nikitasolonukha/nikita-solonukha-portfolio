// One-time media preparation. Point FFMPEG_PATH at an ffmpeg binary.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ffmpeg = process.env.FFMPEG_PATH;
if (!ffmpeg || !fs.existsSync(ffmpeg)) throw new Error('Set FFMPEG_PATH to an ffmpeg binary');
const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'portfolio/data.json');
let data = fs.readFileSync(dataPath, 'utf8');
const sources = [...new Set([...data.matchAll(/"src": "(\.\.\/projects\/[^\"]+\.webm)"/g)].map(m => m[1]))];
for (const source of sources) {
  const input = path.resolve(root, 'portfolio', source);
  const output = input.replace(/\.webm$/i, '.mp4');
  if (!fs.existsSync(input)) throw new Error(`Missing ${input}`);
  if (!fs.existsSync(output)) {
    const args = ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
      '-map', '0:v:0', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'veryfast',
      '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
      '-movflags', '+faststart', output];
    const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`ffmpeg failed: ${source}`);
  }
  data = data.replaceAll(source, source.replace(/\.webm$/i, '.mp4'));
  console.log(`${source} -> ${path.basename(output)} (${(fs.statSync(output).size / 1048576).toFixed(1)} MiB)`);
}
fs.writeFileSync(dataPath, data);
console.log(`Updated ${sources.length} public video sources`);
