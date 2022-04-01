Cypress.Commands.add('buildBookmarklet', (path) => {
  cy.exec(`npm run build ${path}`)
    .then(({ stdout }) => {
      const [bookmarklet] = stdout.split('\n').slice(-1);

      return bookmarklet;
    });
});

Cypress.Commands.add('runBookmarklet', (bookmarklet) => {
  cy.window().then(window => {
    window.location = bookmarklet;
  });
});

Cypress.Commands.add('toggleFullscreen', (isFullscreen) => {
  cy.document().then(document => {
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => isFullscreen ? document.documentElement : null,
    });

    document.dispatchEvent(new Event('fullscreenchange'));
  });
});
