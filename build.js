const fs = require('fs');
const bookmarkleter = require('bookmarkleter');

const [sourcePath] = JSON.parse(process.env.npm_config_argv).remain;
const source = fs.readFileSync(sourcePath, 'utf8');
const bookmarklet = bookmarkleter(source, {
  iife: true,
  minify: true,
});

console.log(bookmarklet);
