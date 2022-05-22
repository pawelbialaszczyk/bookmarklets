const elements = document.querySelectorAll('body *');

for (let i = 0; i < elements.length; i++) {
  const { position } = getComputedStyle(elements[i]);

  if (position === 'fixed' || position === 'sticky') {
    elements[i].parentNode.removeChild(elements[i]);
  }
}
