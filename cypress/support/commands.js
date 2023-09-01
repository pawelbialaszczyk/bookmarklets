/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

Cypress.Commands.add('runBookmarklet', bookmarkletPath => {
  cy.readFile(bookmarkletPath, 'utf8')
    .then(bookmarklet => cy.window()
      .its('location')
      .invoke('assign', bookmarklet));
});

Cypress.Commands.add('setFullscreen', isFullscreen => {
  cy.document().then(document => {
    Object.defineProperty(document, 'fullscreenElement', {
      configurable: true,
      get: () => isFullscreen ? document.documentElement : null,
    });

    document.dispatchEvent(new Event('fullscreenchange'));
  });
});
