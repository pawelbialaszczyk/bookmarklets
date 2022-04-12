Cypress.Commands.add('runBookmarklet', (bookmarkletPath) => {
  cy.readFile(bookmarkletPath, 'utf8')
    .then(bookmarklet => cy.window()
      .then(window => {
        window.location = bookmarklet;
      })
    );
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
