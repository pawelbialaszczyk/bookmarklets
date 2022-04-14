const fs = require('fs/promises');
const path = require('path');
const bookmarkleter = require('bookmarkleter');

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

Promise.all([
  build('./src/bandcamp-volume.js', './dist/bandcamp-volume.bookmarklet'),
  build('./src/playback-rate-controls.js', './dist/playback-rate-controls.bookmarklet'),
]);
