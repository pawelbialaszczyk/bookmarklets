const fs = require('fs');
const bookmarkleter = require('bookmarkleter');

const [sourcePath] = process.argv.slice(2);
const source = fs.readFileSync(sourcePath, 'utf8');
const bookmarklet = bookmarkleter(source, {
  iife: true,
  minify: true,
});

console.log(bookmarklet);
