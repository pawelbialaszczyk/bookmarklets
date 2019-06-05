const audio = document.querySelector('audio[src]');

if (!audio) {
  alert('Audio not found');
  return;
}

audio.controls = true;

Object.assign(audio.style, {
  'visibility': 'visible',
  'display': 'block',
  'position': 'fixed',
  'bottom': '0',
  'z-index': '999999',
  'height': 'unset',
  'width': '100%',
});
