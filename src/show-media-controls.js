const media = document.querySelector('video') || document.querySelector('audio');

if (!media) {
  alert('Media not found');
  return;
}

media.controls = true;

Object.assign(media.style, {
  'visibility': 'visible',
  'display': 'block',
  'position': 'fixed',
  'bottom': '0',
  'z-index': '999999',
  'height': 'revert',
  'width': '100%',
});
