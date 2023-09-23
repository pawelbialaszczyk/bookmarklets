/// <reference types="cypress" />
/// <reference types=".." />
// @ts-check

describe('Show media controls', () => {
  it('should display controls', () => {
    const media = () => cy.get('audio');

    cy.intercept('GET', '/', {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <audio
          style="visibility: hidden"
          muted
          src="https://www.w3schools.com/html/horse.ogg"
        >
      `,
    });

    cy.visit('/');

    media().should('not.be.visible');

    cy.runBookmarklet('./dist/show-media-controls.bookmarklet');

    media().should('be.visible');
  });
});
