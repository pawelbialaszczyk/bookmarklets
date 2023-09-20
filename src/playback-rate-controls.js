const createButton = text => {
  const btn = document.createElement('button');

  btn.innerHTML = text;
  btn.type = 'button';

  Object.assign(btn.style, {
    'width': '10rem',
    'font': 'revert',
    'background': 'revert',
    'border': 'revert',
    'margin': 'revert',
    'padding': 'revert',
  });

  return btn;
};

const createInfo = info => {
  const el = document.createElement('div');

  el.innerHTML = info;

  Object.assign(el.style, {
    'width': '5rem',
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'background-color': 'white',
    'font': 'revert',
    'color': 'initial',
  });

  return el;
};

const createContainer = (...children) => {
  const el = document.createElement('div');

  el.setAttribute('data-test', 'playback-rate-controls');

  Object.assign(el.style, {
    'position': 'fixed',
    'bottom': '1rem',
    'right': '1rem',
    'display': 'flex',
    'align-items': 'stretch',
    'z-index': '999999',
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
  media.playbackRate = (media.playbackRate - 0.1).toFixed(1);
});

fasterBtn.addEventListener('click', event => {
  media.playbackRate = (media.playbackRate + 0.1).toFixed(1);
});

media.addEventListener('ratechange', event => {
  infoEl.innerHTML = event.target.playbackRate.toFixed(1);
});

document.addEventListener('fullscreenchange', event => {
  const isFullscreen = document.fullscreenElement != null;

  container.style.visibility = isFullscreen ? 'hidden' : 'visible';
});
