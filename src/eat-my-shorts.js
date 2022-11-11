const url = window.location.href.replace(/shorts\/(.*)/, 'watch?v=$1');

window.location.assign(url);
