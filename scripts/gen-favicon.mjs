import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const input = path.resolve(__dirname, '../public/logo.png');
  const output = path.resolve(__dirname, '../public/favicon.ico');
  const png = await readFile(input);
  const ico = await pngToIco(png);
  await writeFile(output, ico);
  console.log(`Generated favicon: ${output}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
