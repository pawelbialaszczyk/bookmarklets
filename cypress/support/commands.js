/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

Cypress.Commands.add('runBookmarklet', bookmarkletName => {
  cy.readFile(`./dist/${bookmarkletName}.bookmarklet`, 'utf8')
    .then(bookmarklet => cy.window()
      .its('location')
      .invoke('assign', bookmarklet));

  cy.wait(0); // Wait for bookmarklet to load
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
