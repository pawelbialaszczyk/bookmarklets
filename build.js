import fs from 'node:fs/promises';
import path from 'node:path';
import bookmarkleter from 'bookmarkleter';

const bookmarklets = [
  'eat-my-shorts',
  'kill-sticky',
  'playback-rate-controls',
  'show-media-controls',
];

const build = async (sourcePath, destinationPath) => {
  const source = await fs.readFile(sourcePath, 'utf8');

  const bookmarklet = bookmarkleter(source, {
    urlencode: false,
    iife: true,
    minify: true,
  });

  await fs.mkdir(path.dirname(destinationPath), { recursive: true });

  await fs.writeFile(destinationPath, bookmarklet, 'utf8');
};

await Promise.all(
  bookmarklets.map(bookmarklet =>
    build(`./src/${bookmarklet}.js`, `./dist/${bookmarklet}.bookmarklet`),
  ),
);
