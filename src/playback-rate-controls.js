const createButton = (text) => {
  const btn = document.createElement('button');

  btn.innerHTML = text;
  btn.type = 'button';
  Object.assign(btn.style, {
    'width': '10rem',
    'font-size': '1.4rem',
    'height': '100%',
  });

  return btn;
};

const createInfo = (info) => {
  const el = document.createElement('span');

  el.innerHTML = info;
  Object.assign(el.style, {
    'width': '5rem',
    'display': 'block',
    'text-align': 'center',
    'font-size': '1.4rem',
  });

  return el;
};

const createContainer = (...children) => {
  const el = document.createElement('div');

  el.id = 'e6e7f007-085e-4974-899b-47c18cbd1f46';

  Object.assign(el.style, {
    'position': 'fixed',
    'bottom': '1rem',
    'right': '1rem',
    'display': 'flex',
    'align-items': 'center',
    'z-index': '999999',
    'background-color': '#ccc',
    'height': '3rem',
  });

  children.forEach(child => {
    el.appendChild(child);
  });

  return el;
};

const media = document.querySelector('video') || document.querySelector('audio');

if (!media) {
  alert('Media not found');
  return;
}

const slowerBtn = createButton('Slower');
const infoEl = createInfo(media.playbackRate.toFixed(1));
const fasterBtn = createButton('Faster');
const container = createContainer(slowerBtn, infoEl, fasterBtn);

document.body.appendChild(container);

slowerBtn.addEventListener('click', event => {
  media.playbackRate -= 0.1;
  infoEl.innerHTML = media.playbackRate.toFixed(1);
});

fasterBtn.addEventListener('click', event => {
  media.playbackRate += 0.1;
  infoEl.innerHTML = media.playbackRate.toFixed(1);
});

document.addEventListener('fullscreenchange', event => {
  const isFullscreen = document.fullscreenElement != null;

  container.style.visibility = isFullscreen ? 'hidden' : 'visible';
});
